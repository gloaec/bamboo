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
        'create_app', 'db', 'models', 'assets', 'Api', 'View',
        'json_response', 'error_respone', 'bad_id_response'
]

_basedir = basedir()
_appdir = os.path.join(_basedir, 'app')
sys.path.append(_basedir)

ROOT_PATH = _basedir
YAML = False
HAML = True
HAML_TAG = False
I18N = True

app = Flask(__name__, 
            instance_path=ROOT_PATH, 
            instance_relative_config=True,
            static_folder=os.path.join(_appdir, 'static')
)

db = SQLAlchemy(app)
babel = Babel(app)
assets = Environment(app)

#def import_submodules(name, path='', classes=False):
#    exec('from app import %s' % name)
#    for f in glob.glob(os.path.join(_appdir, name ,'*.py')):
#        model = submodel = os.path.basename(f)[:-3] 
#        if classes: submodel = model.title()
#        if model != '__init__':
#            mod_name = 'app.%s.%s' % (name, model)
#            mod_class = 'app.%s.%s' % (name, submodel)
#            try:
#                if classes:
#                    mod = __import__(mod_name, globals(), locals(), fromlist=[submodel])
#                    mod = getattr(mod, submodel)
#                else:
#                    mod = __import__(mod_name, globals(), locals())
#                if not mod_class in sys.modules: 
#                    sys.modules[mod_class] = mod
#                    exec('%s.%s = mod' % (name, submodel))
#            except ImportError:
#                print 'Failed to import Model: ', model.title()
#
#import_submodules('models', classes=True)
#import_submodules('models', plugins=classes=True)


# load_config(app):
if YAML:
    app.config = yaml.load(file(os.path.join(ROOT_PATH,'config','application.yml'), 'r'))
else:
    app.config.from_pyfile('config/application.py')

# init_babel(app):
@babel.localeselector
def get_locale():
    user = getattr(g, 'user', None)
    if user is not None:
        return user.locale
    return 'fr' #request.accept_languages.best_match(['fr', 'en'])

# init_db(app):

# init_assets(app):
if HAML:
    from hamlish_jinja import HamlishExtension
    app.jinja_env.add_extension(HamlishExtension)
    if app.config['DEBUG']:
        app.jinja_env.hamlish_mode='debug'
    app.jinja_env.hamlish_enable_div_shortcut=True
elif HAML_TAG:
    from hamlish_jinja import HamlishTagExtension
    app.jinja_env.add_extension(HamlishTagExtension)
    if app.config['DEBUG']:
        app.jinja_env.hamlish_mode='debug'
    app.jinja_env.hamlish_enable_div_shortcut=True

assets.url = app.static_url_path# = os.path.join(_appdir, 'static')

all_css = Bundle('css/application.css.sass', filters='sass', output='all.css',
                depends=('css/**/*.scss','css/**/*.sass')) 
all_css_min = Bundle(all_css, filters='cssmin', output="all.min.css")


#//= require_tree ./backbone/config
#//= require backbone/app
#//= require_tree ./backbone/controllers
#//= require_tree ./backbone/entities
#//= require_tree ./backbone/views
#//= require_tree ./backbone/components
#//= require_tree ./backbone/apps


all_jst = Bundle( \
        'js/apps/**/**/templates/*.hamlc', 'js/components/**/**/templates/*.hamlc', \
        #depends=('templates/*.hamlc', 'templates/**/*.hamlc'), \
        filters='jst', output='templates.js')

all_coffee = Bundle( \
        'js/config/*.coffee','js/config/**/*.coffee', 'js/config/**/**/*.coffee', \
        'js/app.coffee', \
        'js/controllers/*.coffee', 'js/controllers/**/*.coffee', \
        'js/entities/**/*.coffee','js/entities/*.coffee',  \
        'js/views/*.coffee', 'js/views/**/*.coffee', \
        'js/components/*.coffee', 'js/components/**/*.coffee', \
        'js/apps/*.coffee', 'js/apps/**/*.coffee', \
        'js/apps/**/**/*.coffee', 'js/apps/**/**/**/*.coffee', \
        filters='coffeescript', output='all.js')

all_js = Bundle(
        'js/lib/json2.js',
        'js/lib/jquery.js', \
        'js/lib/spin.js', \
        'js/lib/jquery-spin.js', \
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

all_js_min = Bundle(all_js, filters='jspacker', output='all.min.js')

if app.config['DEBUG']:
  app.config['ASSETS_DEBUG'] = True
  assets.register('all_css', all_css)
  assets.register('all_js', all_js)
else:
  assets.register('all_css', 'all.min.css')
  assets.register('all_js', 'all.min.js')

app.config['JST_COMPILER'] = ' \
                function(template){ \
                    return haml.compileHaml({ \
                        source: template, generator: "coffeescript"\
                    }); \
                }'

#init_app(app):

#load_models(app)
#load_views(app)
#load_apis(app)

@app.errorhandler(404)
def not_found(error):
    return render_template('404.haml'), 404

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


#load_views(app):
for f in glob.glob(os.path.join(_appdir, 'views' ,'*.py')):
    view = os.path.basename(f)[:-3] 
    if view != '__init__':
        mod_name = 'app.views.%s' % view
        try:
            mod = __import__(mod_name, globals(), locals(), ['view'])
            blueprint = getattr(mod, 'view')
            app.register_blueprint(blueprint)
        except ImportError:
            print 'Failed to import View: ', view


#load_apis(app):
for f in glob.glob(os.path.join(_appdir, 'apis' ,'*.py')):
    api = os.path.basename(f)[:-3] 
    if api != '__init__':
        mod_name = 'app.apis.%s' % api
        try:
            mod = __import__(mod_name, globals(), locals(), ['api'])
            blueprint = getattr(mod, 'api')
            app.register_blueprint(blueprint)
        except ImportError:
            print 'Failed to import Api: ', api

