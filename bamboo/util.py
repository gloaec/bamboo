# -*- coding: utf-8 -*-
import os
import inspect
import glob

from os.path import join, dirname, basename
from flask import Flask, url_for, json, jsonify, g, request, Response, \
        render_template, make_response, send_from_directory

def basedir():
    cwd = os.getcwd()
    directories = cwd.split(os.sep)
    for index, directory in reversed(list(enumerate(directories))):
        path = os.path.join('/', *directories[:index+1])
        if os.path.exists(os.path.join(path, 'config', 'bamboo.yml')):
            return path
    return None


def find_subclasses(module):
    return list(set([
        cls
            for name, cls in inspect.getmembers(module)
                if inspect.isclass(cls)
    ]))


def import_mod(name):
    mod = __import__(name)
    components = name.split('.')
    for comp in components[1:]:
        mod = getattr(mod, comp)
    return mod


def import_all_models(path):
    for f in glob.glob(join(dirname(path),"*.py")):
        model = basename(f)[:-3] 
        if model != '__init__':
            mod_name = 'app.models.%s' % model
            try:
                mod = __import__(model, globals(), locals(), fromlist=[model.title()])
                klass = getattr(mod, model.title())
                if not '%s' % model.title() in locals(): 
                    locals()[model.title()] = klass
            except ImportError:
                print 'Failed to import Model: ', model


def json_response(body, status_code=200):
    resp = make_response(json.dumps(body))
    resp.status_code = status_code
    resp.mimetype = 'application/json'
    return resp


def error_response(msg, status_code=500, to_json=False):
    if(to_json): msg = json.dumps(msg)
    resp = make_response(msg)
    resp.status_code = status_code
    resp.mimetype = ('application/json','text/plain')[to_json]
    return resp


def bad_id_response(id):
        return error_response("Invalid id: %s" % id, 400)


