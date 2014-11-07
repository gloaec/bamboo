# -*- coding: utf-8 -*-
import os
import glob
import pkgutil

from flask import Flask, request, render_template
from webassets import Bundle    

from .views import * 
from .models import User
from .config import DefaultConfig
from .ext import db, mail, cache, login_manager, oid, babel, assets
from .lib import INSTANCE_FOLDER_PATH
from .lib.assets import bundle_dir, bundle_module, all_files_with_extension
from . import apps

__all__ = ['create_app']

DEFAULT_BLUEPRINTS = [
    admin,
    api,
    frontend,
    settings,
    users
]

def create_app(config=None, app_name=None, blueprints=None):
    """Create a Flask app."""

    if app_name is None:
        app_name = DefaultConfig.PROJECT
    if blueprints is None:
        blueprints = DEFAULT_BLUEPRINTS

    app = Flask(app_name,
            instance_path=INSTANCE_FOLDER_PATH, 
	    instance_relative_config=True)

    configure_app(app, config)
    configure_hook(app)
    configure_blueprints(app, blueprints)
    configure_apps(app)
    configure_extensions(app)
    configure_assets(app)
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


def configure_assets(app):
    """ Configure the asset pipeline """

    app.config['ASSETS_URL'] = app.static_url_path
    app.config['ASSETS_CACHE'] = os.path.join(app.static_folder, '.cache')
    app.config['JST_COMPILER'] = ' \
                    function(template){ \
                        return haml.compileHaml({ \
                            source: template, generator: "coffeescript"\
                        }); \
                    }'

    app.bundles = {}

    all_js_libs = [
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
            'js/lib/backbone-marionette-subrouter.js']

    jst_urls   = all_files_with_extension('', 'hamlc')
    css_urls   = all_files_with_extension('', 'css')

    coffee_urls = []

    coffee_roots = (
            os.path.join(app.static_folder, 'coffee'), 
            os.path.join(app.root_path, 'apps', '**', 'static', 'coffee')) 

    for coffee_root in coffee_roots:
        coffee_urls.extend(all_files_with_extension(os.path.join(coffee_root, 'config'),      'coffee')),
        coffee_urls.extend(all_files_with_extension(             coffee_root,                 'coffee', depth=1)),
        coffee_urls.extend(all_files_with_extension(os.path.join(coffee_root, 'controllers'), 'coffee')),
        coffee_urls.extend(all_files_with_extension(os.path.join(coffee_root, 'entities'),    'coffee')),
        coffee_urls.extend(all_files_with_extension(os.path.join(coffee_root, 'views'),       'coffee')),
        coffee_urls.extend(all_files_with_extension(os.path.join(coffee_root, 'components'),  'coffee')),
        coffee_urls.extend(all_files_with_extension(os.path.join(coffee_root, 'apps'),        'coffee')),

    all_coffee = []
    all_coffee.append(Bundle(
            *coffee_urls,
            filters="coffeescript", output='app.js'))
    

    if app.debug or app.testing:
        """ Compile coffee bundle file by file """ 

        app.config['ASSETS_DEBUG'] = True
        all_coffee = bundle_module(app.static_folder, '')

        for module in app.apps:
            all_coffee.extend(bundle_module(module.static_folder, module.name))
            jst_urls.extend(all_files_with_extension(module.name, 'hamlc'))
            css_urls.extend(all_files_with_extension(module.name, 'css'))

    else:
        """ Compile coffee bundle all in one file """ 

        for module in app.apps:
            jst_urls.extend(all_files_with_extension(module.name, 'hamlc'))
            css_urls.extend(all_files_with_extension(module.name, 'css'))

    app.bundles['all_jst'] = Bundle(
            *jst_urls,
            filters = 'jst', 
            output  = os.path.join(app.config['ASSETS_CACHE'], 'templates.js'))

    all_js = []
    all_js.extend(all_js_libs)
    all_js.append(app.bundles['all_jst'])
    all_js.extend(all_coffee)

    app.bundles['all_js'] = Bundle(
            *all_js,
            output = 'app.js')

    app.bundles['all_scss'] = Bundle('css/app.scss',
            filters = 'pyscss',
            output  = 'app.css',
            depends = ('css/**/*.scss','css/**/*.sass','css/**/*.css','css/*.css')) 

    #FIXME: change for relative urls
    app.bundles['all_css'] = Bundle(app.bundles['all_scss'],
            output  = 'app.css') 

    app.bundles['all_css_min'] = Bundle(
            app.bundles['all_css'],
            filters = 'cssmin',
            output  = 'app.min.css')
    
    app.bundles['all_js_min'] = Bundle(
            app.bundles['all_js'], 
            filters = 'jspacker',
            output  = 'app.min.js')

    if app.debug or app.testing:
        assets.register('css', app.bundles['all_css'])
        assets.register('js', app.bundles['all_js'])
    else:
        assets.register('css', 'app.min.css')
        assets.register('js', 'app.min.js')


def configure_blueprints(app, blueprints):
    """Configure blueprints in views."""

    for blueprint in blueprints:
        app.register_blueprint(blueprint)


def configure_apps(app):
    """Configure modules in views."""

    app.apps = []
    prefix = apps.__name__ + "."

    for importer, modname, ispkg in pkgutil.iter_modules(apps.__path__, prefix):
	if ispkg:
            try:
                module = __import__(modname, fromlist="create_app")
	        mod = module.create_app(app)
                app.register_blueprint(mod)
                app.apps.append(mod)
            except Exception, e:
		print "Error loading module '%s': %s" % (modname, e)


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
