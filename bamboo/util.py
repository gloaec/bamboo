# -*- coding: utf-8 -*-
import os
import inspect

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
