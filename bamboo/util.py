# -*- coding: utf-8 -*-
import os
import inspect
import glob
from os.path import join, dirname, basename

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


def import_all_models():
    for f in glob.glob(join(dirname(__file__),"*.py")):
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
