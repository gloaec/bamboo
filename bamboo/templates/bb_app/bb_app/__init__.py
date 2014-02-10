# -*- coding: utf-8 -*-
import os
import glob

from flask import Flask, request, render_template

from .views import * 
from .models import User
from .config import DefaultConfig
from .ext import db, mail, cache, login_manager, oid, babel, assets
from .lib import INSTANCE_FOLDER_PATH

__all__ = ['create_app']

DEFAULT_BLUEPRINTS = [
    admin,
    api,
    frontend,
    settings,
    users
]

def create_app(config=None, app_name=None, blueprints=None, modules=None):
    """Create a Flask app."""

    if app_name is None:
        app_name = DefaultConfig.PROJECT
    if blueprints is None:
        blueprints = DEFAULT_BLUEPRINTS
    if modules is None:
        modules = []

    app = Flask(app_name,
            instance_path=INSTANCE_FOLDER_PATH, 
	    instance_relative_config=True)

    configure_app(app, config)
    configure_hook(app)
    configure_blueprints(app, blueprints)
    configure_modules(app, modules)
    configure_extensions(app)
    configure_assets(app, modules)
    configure_logging(app)
    configure_template_filters(app)
    configure_error_handlers(app)
    configure_marionette(app)

    return app


def configure_app(app, config=None):
    """Different ways of configurations."""

    # http://flask.pocoo.org/docs/api/#configuration
    app.config.from_object(DefaultConfig)

    # http://flask.pocoo.org/docs/config/#instance-folders
    app.config.from_pyfile('production.cfg', silent=True)

    if config:
        app.config.from_object(config)

    app.root_path = os.path.abspath(os.path.dirname(__file__))
    app.static_folder = 'static'
    app.templates_folder = 'templates'
    # Use instance folder instead of env variables to make deployment easier.
    #app.config.from_envvar('%s_APP_CONFIG' % DefaultConfig.PROJECT.upper(), silent=True)


def configure_extensions(app):
    """ Initialize all extensions with current_app """

    # flask-sqlalchemy
    db.init_app(app)

    # flask-mail
    mail.init_app(app)

    # flask-cache
    cache.init_app(app)

    # flask-babel
    babel.init_app(app)
    os.environ['TZ'] = app.config['BABEL_DEFAULT_TIMEZONE']

    @babel.localeselector
    def get_locale():
        accept_languages = app.config.get('ACCEPT_LANGUAGES')
        return request.accept_languages.best_match(accept_languages)

    # flask-login
    login_manager.login_view = 'frontend.login'
    login_manager.refresh_view = 'frontend.reauth'
    login_manager.login_message_category = 'danger'

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(id)
    login_manager.setup_app(app)

    # flask-openid
    oid.init_app(app)
    
    # flask-assets
    assets.init_app(app)


def configure_assets(app, modules):
    """ Configure the asset pipeline """

    app.config['ASSETS_URL'] = app.static_url_path
    app.config['ASSETS_CACHE'] = os.path.join(app.root_path, app.static_folder, '.cache')

    from webassets import Bundle

    if app.debug or app.testing:
        """ Compile coffee bundle file by file """ 

        app.config['ASSETS_DEBUG'] = True
        app.config['JST_COMPILER'] = ' \
                        function(template){ \
                            return haml.compileHaml({ \
                                source: template, generator: "coffeescript"\
                            }); \
                        }'

        def _bundle_dir(directory, static_root, static_folder, recursive=True):
            bundle           = []
            coffee_folder    = os.path.join(static_folder, 'coffee')
            coffee_root      = os.path.join(static_root, 'coffee')
            js_folder        = os.path.join(static_folder, 'js')
            js_root          = os.path.join(static_root, 'js')
            coffee_directory = os.path.join(coffee_folder, directory)
            js_directory     = os.path.join(js_folder, directory)

            if not os.path.isdir(coffee_directory):
                return bundle
            elif not os.path.isdir(js_directory):
                os.makedirs(js_directory)

            root, dirs, files = next(os.walk(coffee_directory))

            if recursive:
                for d in sorted(dirs):
                    next_directory = os.path.join(directory, d)
                    bundle.extend(_bundle_dir(next_directory, static_root,
                            static_folder, recursive=True))

            for f in sorted(files):
                if f.endswith('.coffee'):
                    coffee_file = os.path.join(coffee_root, directory, f)
                    js_file     = os.path.join(js_root,   directory, f)
                    js_file     = js_file.replace('.js.coffee', '.js')
                    js_file     = js_file.replace('.coffee',    '.js')
                    bundle.append(Bundle(coffee_file, filters="coffeescript", output=js_file))
                    
            return bundle

        def _bundle_module(static_folder, static_root):
            bundle        = []
            js_folder     = os.path.join(static_folder, 'js')

            if not os.path.exists(js_folder):
                os.makedirs(js_folder)

            bundle.extend(_bundle_dir('config',      static_root, static_folder))
            bundle.extend(_bundle_dir('',            static_root, static_folder, recursive=False))
            bundle.extend(_bundle_dir('controllers', static_root, static_folder))
            bundle.extend(_bundle_dir('entities',    static_root, static_folder))
            bundle.extend(_bundle_dir('views',       static_root, static_folder))
            bundle.extend(_bundle_dir('components',  static_root, static_folder))
            bundle.extend(_bundle_dir('apps',        static_root, static_folder))

            return bundle

        def _all_with_extension(prefix, extension, depth=6):
            urls = []
            if not prefix: prefix = ''
            elif not prefix.endswith('/'): prefix+='/'
            for i in range(depth):
                urls.append(prefix+'**/'*i+'*.'+extension)
            return urls

        all_coffee = _bundle_module(app.static_folder, '')
        jst_urls   = _all_with_extension('', 'hamlc')

        for module in modules:
            all_coffee.extend(_bundle_module(module.static_folder, module.name))
            jst_urls.extend(_all_with_extension(module.name, 'hamlc'))

        all_css = Bundle('css/app.scss',
                filters = 'scss',
                output  = 'app.css',
                depends = ('css/**/*.scss','css/**/*.sass')) 

        all_jst = Bundle(
                *jst_urls,
                filters = 'jst', 
                output  = os.path.join(app.config['ASSETS_CACHE'], 'templates.js'))

        all_js = Bundle(
                'js/lib/json2.js',
                'js/lib/jquery.js',
                'js/lib/spin.js',
                'js/lib/moment.js',
                'js/lib/jquery-spin.js',
                'js/lib/bootstrap.js',
                'js/lib/underscore.js',
                'js/lib/underscore-string.js',
                'js/lib/coffeescript.js',
                'js/lib/haml.js',
                'js/lib/backbone.js',
                'js/lib/backbone-stickit.js',
                'js/lib/backbone-validation.js',
                'js/lib/backbone-associations.js',
                'js/lib/backbone-cocktail.js',
                'js/lib/backbone-picky.js',
                'js/lib/backbone-memento.js',
                'js/lib/backbone-actas-mementoable.js',
                'js/lib/backbone-marionette.js',
                'js/lib/backbone-marionette-subrouter.js',
                all_jst,
                *all_coffee,
                output = 'app.js')

        all_css_min = Bundle(all_css,
                filters = 'cssmin',
                output  = 'app.min.css')
    
        all_js_min = Bundle(
                all_js, 
                filters = 'jspacker',
                output  = 'all.min.js')

        assets.register('css', all_css)
        assets.register('js', all_js)
    
    else:
        assets.register('css', 'app.min.css')
        assets.register('js', 'app.min.js')
    


def configure_blueprints(app, blueprints):
    """Configure blueprints in views."""

    for blueprint in blueprints:
        app.register_blueprint(blueprint)


def configure_modules(app, modules):
    """Configure modules in views."""

    from .apps.blog import create_mod
    blog = create_mod(app)
    app.register_blueprint(blog)
    modules.append(blog)

    #from .modules.movies import create_mod
    #movies = create_mod(app)
    #app.register_blueprint(movies)
    #modules.append(movies)


def configure_template_filters(app):
    """ Define some helpers for templates rendered with Jinga2 """

    @app.template_filter()
    def pretty_date(value):
        return pretty_date(value)

    @app.template_filter()
    def format_date(value, format='%Y-%m-%d'):
        return value.strftime(format)


def configure_logging(app):
    """Configure file(info) and email(error) logging."""

    if app.debug or app.testing:
        # Skip debug and test mode. Just check standard output.
        return

    import logging
    from logging.handlers import SMTPHandler

    # Set info level on logger, which might be overwritten by handers.
    # Suppress DEBUG messages.
    app.logger.setLevel(logging.INFO)

    info_log = os.path.join(app.config['LOG_FOLDER'], 'info.log')
    info_file_handler = logging.handlers.RotatingFileHandler(info_log, maxBytes=100000, backupCount=10)
    info_file_handler.setLevel(logging.INFO)
    info_file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s '
        '[in %(pathname)s:%(lineno)d]')
    )
    app.logger.addHandler(info_file_handler)

    # Testing
    #app.logger.info("testing info.")
    #app.logger.warn("testing warn.")
    #app.logger.error("testing error.")

    mail_handler = SMTPHandler(app.config['MAIL_SERVER'],
                               app.config['MAIL_USERNAME'],
                               app.config['ADMINS'],
                               'O_ops... %s failed!' % app.config['PROJECT'],
                               (app.config['MAIL_USERNAME'],
                                app.config['MAIL_PASSWORD']))
    mail_handler.setLevel(logging.ERROR)
    mail_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s '
        '[in %(pathname)s:%(lineno)d]')
    )
    app.logger.addHandler(mail_handler)


def configure_hook(app):
    """ Configure the application hooks """
    @app.before_request
    def before_request():
        pass


def configure_error_handlers(app):
    """ Bind splash pages for errors """

    @app.errorhandler(403)
    def forbidden_page(error):
        return render_template("errors/forbidden_page.html"), 403

    @app.errorhandler(404)
    def page_not_found(error):
        return render_template("errors/page_not_found.html"), 404

    @app.errorhandler(500)
    def server_error_page(error):
        return render_template("errors/server_error.html"), 500

def configure_marionette(app):
    pass
