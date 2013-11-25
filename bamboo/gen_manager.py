import os
import sys

from sqlalchemy.exc import IntegrityError

from .manager import Manager
from .commands import Command, Option
from .cli import prompt, prompt_pass, prompt_bool, prompt_choices
from .alembic.util import template_to_file
from .util import basedir

_basedir = basedir()
_pkgdir = os.path.abspath(os.path.dirname(__file__))
sys.path.append(_basedir)
from app import models


class AttributeList(dict):
    #def __init__(self, *args, **kwargs):
    #    super(AttributeList, self).__init__(args[0])

    def to_dict(self):
        return [model.to_dict() for model in self]

    def to_json(self):
        return json.dumps(self.to_dict())

    def columns(self):
        return "\n    ".join(["%s = Column(%s)" % (key, value) for key, value in self.iteritems()])
         
    def parameters(self):
        return ", ".join(["%s=None" % key for key, value in self.iteritems() if key != 'id'])

    def instances(self):
        return "\n        ".join(["self.%s = %s" % (key,key) for key in self.keys() if key != 'id'])


class GenManager(Manager):
    
    help = description = usage = "Generates new components in the application"

    def add_default_commands(self):
        self.add_command('model', GenModel())


class GenModel(Command):

    help = description = "Generates a new model"

    def __init__(self, name=None, attributes=[]):
        self.resource = name
        self.attributes = {"id":"Integer, primary_key=True"}
        for value in attributes:
            attribute = value.split(':')
            self.attributes[attribute[0]] = attribute[1]


    def get_options(self):
        return (
            Option('name', default=None, 
                    help="Resource name (must be singular)"),
            Option('attributes', default="", nargs="*",
                    help="Model attributes <attrname:attrtype> (ex: 'email:string')"),
        )

    def run(self, name, attributes):
        self.resource = name.lower()
        self.attributes = dict()
        for value in attributes:
            attribute = value.split(':')
            self.attributes[attribute[0]] = attribute[1]
        self.attributes["id"] = "Integer, primary_key=True"
        directory = os.path.join('app','models')
        template_to_file(os.path.join(_pkgdir, 'templates', 'scaffold', directory, 'resource.py.mako'),
                        os.path.join(_basedir, directory, '%s.py' % self.resource),
                        resource=self.resource, attributes=AttributeList(**self.attributes))


