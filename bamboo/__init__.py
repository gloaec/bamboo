# -*- coding: utf-8 -*-
from __future__ import absolute_import

import os
import sys
import logging

from flask import Flask

from .managers.manager import Manager
from .utils import basedir, appdir, find_subclasses
# --------------------

logging.basicConfig(level=logging.DEBUG)

def main(argv=None, prog=None, **kwargs):
    _basedir = basedir()
    manager = None

    if not _basedir:
        # Not in an application context

        from .managers.commands import NewApplication
        manager = Manager(Flask(__name__), with_default_commands=False)
        manager.add_command("new", NewApplication)
    else:
        # Load Application context 
        if _basedir != os.getcwd():
            print "(in %s)" % _basedir

	_appdir = appdir()
	_appname = os.path.dirname(_appdir)
    
        sys.path.append(_basedir)
        bb_app_manager = __import__('manage')
	manager = bb_app_manager.manager

        #execfile(os.path.abspath(os.path.join(_basedir, 'manage.py')), globals())
    manager.run()



