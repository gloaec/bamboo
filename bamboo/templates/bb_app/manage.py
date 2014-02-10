# -*- coding: utf-8 -*-
import os

from bamboo.model import Base
from bamboo.utils import find_subclasses, appdir
from bamboo.managers.manager import Manager
from bamboo.managers.databases import DBManager
from bamboo.managers.assets import AssetsManager
from bamboo.managers.generators import GenManager
from bamboo.managers.commands import Clean, ShowUrls, Group, Option, InvalidCommand, Command, \
                      Server, Shell, NewApplication, NewModule

from bb_app import create_app, models
from bb_app.ext import db, assets

_appdir = appdir()

app = create_app()
app.root_path = _appdir
app.static_folder    = 'static'
app.templates_folder = 'templates'

manager = Manager(app, with_default_commands=False)

def _make_context():
    import inspect
    models_list = {}
    for model in find_subclasses(models):
	if inspect.isclass(model):
	    if Base in model.__bases__:
                models_list[model.__name__] = model
   
    print "app = %s" % str(app)
    print "db = %s" % str(db)
    print "Available models: %s" % ', '.join(models_list.keys())
    return dict(app=app, db=db, **models_list)

manager.add_command("db", DBManager(app, db=db, with_default_commands=True))
manager.add_command("generate", GenManager(app, with_default_commands=True))
manager.add_command("console", Shell(make_context=_make_context))
manager.add_command("server", Server())
manager.add_command("routes", ShowUrls())
manager.add_command("assets", AssetsManager(assets))
manager.add_command("clean", Clean())
manager.add_command("new", NewModule())
manager.run()
