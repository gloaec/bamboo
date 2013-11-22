import os
import sys
import logging

from webassets.script import CommandLineEnvironment
from flask.ext.assets import Environment

from .manager import Manager
from .commands import Command, Option
from .util import basedir, find_subclasses
from .cli import prompt, prompt_pass, prompt_bool, prompt_choices

class AssetsManager(Manager):
    
    help = description = usage = "Manage Assets"

    def add_default_commands(self):
        self.add_command('build', AssetsBuild())


class AssetsBuild(Command):

    help = description = "Compile the assets and generates production files"

    def __init__(self):
        pass

    def get_options(self):
        return (
        )

    def handle(self, app, **kwargs):
        from .application import all_css_min, all_js_min
        assets = Environment(app)
        assets.url = app.static_url_path# = os.path.join(_appdir, 'static')
        assets.register('all_css', all_css_min)
        assets.register('all_js', all_js_min)
        log = logging.getLogger('webassets')
        log.addHandler(logging.StreamHandler())
        log.setLevel(logging.DEBUG)
        cmdenv = CommandLineEnvironment(assets, log)
        cmdenv.invoke('build', kwargs)


