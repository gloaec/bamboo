# -*- coding: utf-8 -*-
from __future__ import absolute_import

import os
import sys

from flask import Flask

from .migrate import Migrate
from .manager import Manager
from .util import basedir, find_subclasses

def main(argv=None, prog=None, **kwargs):
    _basedir = basedir()
    manager = None
    if not _basedir:
        from .commands import NewApplication
        manager = Manager(Flask(__name__), with_default_commands=False)
        manager.add_command("new", NewApplication)
    else:
        if _basedir != os.getcwd():
            print "(in %s)" % _basedir
        from .db_manager import DBManager
        from .assets_manager import AssetsManager
        from .gen_manager import GenManager
        from .commands import Clean, ShowUrls, Group, Option, InvalidCommand, Command, \
                              Server, Shell, NewApplication, NewModule

        # Add Current Application to python path
        _basedir = basedir()
        sys.path.append(_basedir)
        from app import db, app, models, assets

        def _make_context():
            models_list = {}
            for model in find_subclasses(models):
                models_list[model.__name__] = model
            print "app = %s" % str(app)
            print "db = %s" % str(db)
            print "Available models: %s" % ', '.join(models_list.keys())
            return dict(app=app, db=db, **models_list)

        manager = Manager(app, with_default_commands=False)
        manager.add_command("db", DBManager(app, with_default_commands=True))
        manager.add_command("generate", GenManager(app, with_default_commands=True))
        manager.add_command("console", Shell(make_context=_make_context))
        manager.add_command("server", Server())
        manager.add_command("routes", ShowUrls())
        manager.add_command("assets", AssetsManager(assets))
        manager.add_command("clean", Clean())
        manager.add_command("new", NewModule())
        #migrate = Migrate(app, db)
    manager.run()
