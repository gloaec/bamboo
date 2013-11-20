# -*- coding: utf-8 -*-
import yaml
import sys
import os
import glob
from flask import Blueprint, Module
from flask.ext.assets import Environment, Bundle
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.babel import Babel

from .util import Flask, url_for, json, jsonify, g, request, Response, \
        render_template, make_response, send_from_directory, basedir, \
        json_response, error_response, bad_id_response

__all__ = [
        'create_app', 'db', 'models', 'Api', 'View',
        'json_response', 'error_respone', 'bad_id_response'
]

MODULES = [
        {'name': 'my_application',  'url_prefix': '/' },
]

# Later on you'll import the other blueprints the same way:
#from application.comments.views import mod as commentsModule
#from application.posts.views import mod as postsModule
#application.register_blueprint(commentsModule)
#application.register_blueprint(postsModule)
_basedir = basedir()
_appdir = os.path.join(_basedir, 'app')
_modelsdir = os.path.join(_appdir, 'models')  
_apisdir = os.path.join(_appdir, 'apis')  
_viewsdir = os.path.join(_appdir, 'views')  
sys.path.append(_basedir)

db = SQLAlchemy()
babel = Babel()
app = None

def import_submodules(name, classes=False):
    exec('from app import %s' % name)
    for f in glob.glob(os.path.join(_appdir, name ,'*.py')):
        model = submodel = os.path.basename(f)[:-3] 
        if classes: submodel = model.title()
        if model != '__init__':
            mod_name = 'app.%s.%s' % (name, model)
            mod_class = 'app.%s.%s' % (name, submodel)
            try:
                if classes:
                    mod = __import__(mod_name, globals(), locals(), fromlist=[submodel])
                    mod = getattr(mod, submodel)
                else:
                    mod = __import__(mod_name, globals(), locals())
                if not mod_class in sys.modules: 
                    sys.modules[mod_class] = mod
                    exec('%s.%s = mod' % (name, submodel))
            except ImportError:
                print 'Failed to import Model: ', model.title()

import_submodules('models', classes=True)

ROOT_PATH = _basedir
YAML = False
HAML = True
HAML_TAG = False
I18N = True

class Api(Blueprint):
    def __init__(self, import_name, name=None, url_prefix=None,
                 static_path=None, subdomain=None):
        if name is None:
            assert '.' in import_name, 'name required if package name ' \
                'does not point to a submodule'
            name = import_name.rsplit('.', 1)[1]
            if url_prefix is None: url_prefix = '/api/%s' % name 
            name = '%s.api' % name
        Blueprint.__init__(self, name, import_name, url_prefix=url_prefix,
                           subdomain=subdomain, template_folder=None)
        if os.path.isdir(os.path.join(self.root_path, 'static')):
            self._static_folder = 'static'

class View(Blueprint):
    def __init__(self, import_name, name=None, url_prefix=None,
                 static_path=None, subdomain=None):
        if name is None:
            assert '.' in import_name, 'name required if package name ' \
                'does not point to a submodule'
            name = import_name.rsplit('.', 1)[1]
            if url_prefix is None: url_prefix = '/%s' % name 
        Blueprint.__init__(self, name, import_name, url_prefix=url_prefix,
                           subdomain=subdomain, 
                           template_folder= os.path.join(_appdir, 'templates'))
        if os.path.isdir(os.path.join(self.root_path, 'static')):
            self._static_folder = 'static'


def create_app(name = __name__):
    application = Flask(__name__, 
                    instance_path=ROOT_PATH, 
                    instance_relative_config=True,
                    static_folder=os.path.join(_appdir, 'static')
    )
    load_config(application)
    init_babel(application)
    init_db(application)
    init_assets(application)
    init_app(application)
    init_modules(application)
    return application
    

def load_config(application):
    if YAML:
        application.config = yaml.load(file(os.path.join(ROOT_PATH,'config','application.yml'), 'r'))
    else:
        application.config.from_pyfile('config/application.py')


def init_babel(application):
    babel.init_app(application)

    @babel.localeselector
    def get_locale():
        user = getattr(g, 'user', None)
        if user is not None:
            return user.locale
        return 'fr' #request.accept_languages.best_match(['fr', 'en'])


def init_db(application):
    db.init_app(application)


def init_assets(application):
    if HAML:
        from hamlish_jinja import HamlishExtension
        application.jinja_env.add_extension(HamlishExtension)
    elif HAML_TAG:
        from hamlish_jinja import HamlishTagExtension
        application.jinja_env.add_extension(HamlishTagExtension)
    assets = Environment(application)
    assets.url = application.static_url_path# = os.path.join(_appdir, 'static')
    
    all_css = Bundle('css/application.css.sass', filters='sass', output='all.css',
                    depends=('css/**/*.scss','css/**/*.sass')) 
    all_css_min = Bundle(all_css, filters='cssmin', output="all.min.css")
    
    all_jst = Bundle( \
            'templates/*.hamlc', 'templates/**/*.hamlc', \
            depends=('templates/*.hamlc', 'templates/**/*.hamlc'), \
            filters='jst', output='templates.js')
    
    all_coffee = Bundle( \
            'js/application.js.coffee', \
            'js/lib/bamboo.js.coffee', \
            'js/**/*.coffee', 'js/**/**/*.coffee', \
            #'js/models/*.coffee', 'js/models/**/*.coffee', \
            #'js/views/*.coffee', 'js/views/**/*.coffee', \
            #'js/routers/*.coffee', 'js/routers/**/*.coffee', \
            'js/router.js.coffee', \
            filters='coffeescript', output='all.js')
    
    all_js = Bundle(
            'js/lib/json2.js',
            'js/lib/jquery.js', \
            #UI
            'js/lib/bootstrap.js', \
            'js/lib/underscore.js', \
            'js/lib/underscore-string.js', \
            'js/lib/coffeescript.js', \
            'js/lib/haml.js', \
            'js/lib/backbone.js', \
            'js/lib/backbone-stickit.js', \
            'js/lib/backbone-validation.js', \
            #'js/lib/sugar', \
            #'js/lib/backbone_rails_sync', \
            'js/lib/backbone-marionette.js', \
            'js/lib/backbone-marionette-subrouter.js', \
            all_jst, all_coffee, output='all.js')
    
    all_js_min = Bundle(all_js, filters='jsmin', output='all.min.js')
    
    assets.register('all_css', all_css)
    assets.register('all_css_min', all_css_min)
    assets.register('all_js', all_js)
    assets.register('all_js_min', all_js_min)
    
    application.config['ASSETS_DEBUG'] = True
    application.config['JST_COMPILER'] = ' \
                    function(template){ \
                        return haml.compileHaml({ \
                            source: template, generator: "coffeescript"\
                        }); \
                    }'

def init_app(application):

    load_models(application)
    load_views(application)
    load_apis(application)

    @application.errorhandler(404)
    def not_found(error):
        return render_template('404.html.haml'), 404


def load_models(application):
    pass


def load_views(application):
    for f in glob.glob(os.path.join(_appdir, 'views' ,'*.py')):
        view = os.path.basename(f)[:-3] 
        if view != '__init__':
            mod_name = 'app.views.%s' % view
            try:
                mod = __import__(mod_name, globals(), locals(), ['view'])
                blueprint = getattr(mod, 'view')
                application.register_blueprint(blueprint)
            except ImportError:
                print 'Failed to import View: ', view


def load_apis(application):
    for f in glob.glob(os.path.join(_appdir, 'apis' ,'*.py')):
        api = os.path.basename(f)[:-3] 
        if api != '__init__':
            mod_name = 'app.apis.%s' % api
            try:
                mod = __import__(mod_name, globals(), locals(), ['api'])
                blueprint = getattr(mod, 'api')
                application.register_blueprint(blueprint)
            except ImportError:
                print 'Failed to import Api: ', api


def load_module_models(application, module):
    #if 'models' in module and module['models'] == False:
    #    return
    #name = module['name']
    #if application.config['DEBUG']:
    #    print '[MODEL] Loading db model %s' % (name)
    #model_name = '%s.models' % (name)
    #try:
    #    mod = __import__(model_name, globals(), locals(), [], -1)
    #except ImportError as e:
    #    if re.match(r'No module named ', e.message) == None:
    #        print '[MODEL] Unable to load the model for %s: %s' % (model_name, e.message)
    #    else:
    #        print '[MODEL] Other(%s): %s' % (model_name, e.message)
    #    return False
    return True


def init_modules(application):
    cur = os.path.abspath(__file__)
    sys.path.append(os.path.join(_appdir, 'modules'))
    for m in MODULES:
        mod_name = '%s.views' % m['name']
        try:
            views = __import__(mod_name, globals(), locals(), [], -1)
        except ImportError:
            load_module_models(application, m)
        else:
            url_prefix = None
            if 'url_prefix' in m:
                url_prefix = m['url_prefix']

            if application.config['DEBUG']:
                print '[VIEW ] Mapping views in %s to prefix: %s' % (mod_name, url_prefix)

                # Automatically map '/' to None to prevent modules from
                # stepping on one another.
            if url_prefix == '/':
                url_prefix = None
            load_module_models(application, m)
            application.register_module(views.module, url_prefix=url_prefix)

app = create_app(__name__)
