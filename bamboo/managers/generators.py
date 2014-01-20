# -*- coding: utf-8 -*-
import os
import sys
import fileinput
from collections import OrderedDict

from .manager import Manager
from .commands import Command, Option
from ..utils import generate_template, generate_directory, append_in_file
# --------------------

class AttributeList(OrderedDict):

    key = 'id'

    #def items(self):
    #    return OrderedDict((k,self[k]) for k in chain(self.key, (self.viewkeys()-self.key))).items()

    #def keys(self):
    #    return OrderedDict((k,self[k]) for k in chain(self.key, (self.viewkeys()-self.key))).keys()

    def noidkeys(self):
        return [key for key in self.keys() if key != 'id']

    def noidenumeratekeys(self):
        return enumerate([key for key in self.keys() if key != 'id'])

    def noiditems(self):
        return AttributeList((key,value) for key, value in self.items() if key != 'id').items()

    def columns(self):
        return "\n    ".join(["%s = Column(%s)" % (key, value) for key, value in self.items()])
         
    def parameters(self):
        return ", ".join(["%s=None" % key for key, value in self.items() if key != 'id'])

    def instances(self):
        return "\n        ".join(["self.%s = %s" % (key,key) for key in self.keys() if key != 'id'])

    def coffee_defaults(self):
        return "\n    ".join(["%s : ''" % key for key in self.keys() if key != 'id'])

    def coffee_bindings(self):
        return "\n    ".join(["'#%s' : '%s'" % (key, key) for key in self.keys() if key != 'id'])


class GenManager(Manager):
    
    help = description = usage = "Generates new components in the application"

    def add_default_commands(self):
        self.add_command('model', GenModel())
        self.add_command('scaffold', GenScaffold())


class GenModel(Command):

    help = description = "Generates a new model"

    def __init__(self, name=None, attributes=[]):
        self.resource = name
        self.attributes = AttributeList()
        self.attributes = {"id":"Integer, primary_key=True"}
        for value in attributes:
            attribute = value.split(':')
            self.attributes[attribute[0]] = attribute[1]

    def get_options(self):
        return (
            Option('name', default=None, 
                    help="Resource name (must be singular)"),
            Option('attributes', default="", nargs="*",
                    help="Model attributes <attrname:AttrType,extra> (ex: 'email:String,unique=True')"),
        )

    def run(self, name, attributes):

        self.resource = name.lower()
        self.attributes = AttributeList()
        self.attributes["id"] = "Integer, primary_key=True"
        for value in attributes:
            attribute = value.split(':')
            self.attributes[attribute[0]] = ", ".join(attribute[1].split(','))
        generate_template(
                        'scaffold/app/models/resource.py',
                        'app/models/%s.py' % self.resource,
                        resource=self.resource,
                        attributes=self.attributes)
        

class GenScaffold(GenModel):

    help = description = "Generates a new model + CRUD views + RESTful Api"

    def get_options(self):
        return (
            Option('name', default=None, 
                    help="Resource name (must be singular)"),
            Option('attributes', default="", nargs="*",
                    help="Model attributes <attrname:AttrType,extra> (ex: 'email:String,unique=True')"),
        )

    def run(self, name, attributes):

        self.resource = name.lower()
        self.attributes = AttributeList()
        self.attributes["id"] = "Integer, primary_key=True"
        for value in attributes:
            attribute = value.split(':')
            self.attributes[attribute[0]] = ", ".join(attribute[1].split(','))

        attr = self.attributes

        generate_template(
                        'scaffold/app/models/resource.py',
                        'app/models/%s.py' % self.resource,
                        resource=self.resource,
                        attributes=attr)
        generate_template(
                        'scaffold/app/apis/resources.py',
                        'app/apis/%ss.py' % self.resource,
                        resource=self.resource,
                        attributes=attr)
        generate_template(
                        'scaffold/app/views/resources.py',
                        'app/views/%ss.py' % self.resource,
                        resource=self.resource,
                        attributes=attr)
        generate_template(
                        'scaffold/app/static/js/models/resource.coffee',
                        'app/static/js/models/%s.coffee' % self.resource,
                        resource=self.resource,
                        attributes=attr)

        """ Marionette Views """

        generate_directory('app/static/js/views/%ss' % self.resource)
        generate_template(
                        'scaffold/app/static/js/views/resources/index.coffee',
                        'app/static/js/views/%ss/index.coffee' % self.resource,
                        resource=self.resource,
                        attributes=attr)
        generate_template(
                        'scaffold/app/static/js/views/resources/resource.coffee',
                        'app/static/js/views/%ss/%s.coffee' % (self.resource, self.resource),
                        resource=self.resource,
                        attributes=attr)
        generate_template(
                        'scaffold/app/static/js/views/resources/new.coffee',
                        'app/static/js/views/%ss/new.coffee' % self.resource,
                        resource=self.resource,
                        attributes=attr)
        generate_template(
                        'scaffold/app/static/js/views/resources/show.coffee',
                        'app/static/js/views/%ss/show.coffee' % self.resource,
                        resource=self.resource,
                        attributes=attr)
        generate_template(
                        'scaffold/app/static/js/views/resources/edit.coffee',
                        'app/static/js/views/%ss/edit.coffee' % self.resource,
                        resource=self.resource,
                        attributes=attr)

        """ Marionette Templates """

        generate_directory('app/static/templates/%ss' % self.resource)
        generate_template(
                        'scaffold/app/static/templates/resources/index.hamlc',
                        'app/static/templates/%ss/index.hamlc' % self.resource,
                        resource=self.resource,
                        attributes=attr)
        generate_template(
                        'scaffold/app/static/templates/resources/resource.hamlc',
                        'app/static/templates/%ss/%s.hamlc' % (self.resource, self.resource),
                        resource=self.resource,
                        attributes=attr)
        generate_template(
                        'scaffold/app/static/templates/resources/new.hamlc',
                        'app/static/templates/%ss/new.hamlc' % self.resource,
                        resource=self.resource,
                        attributes=attr)
        generate_template(
                        'scaffold/app/static/templates/resources/show.hamlc',
                        'app/static/templates/%ss/show.hamlc' % self.resource,
                        resource=self.resource,
                        attributes=attr)
        generate_template(
                        'scaffold/app/static/templates/resources/edit.hamlc',
                        'app/static/templates/%ss/edit.hamlc' % self.resource,
                        resource=self.resource,
                        attributes=attr)
        generate_template(
                        'scaffold/app/static/js/routers/resources.coffee',
                        'app/static/js/routers/%ss.coffee' % self.resource,
                        resource=self.resource,
                        attributes=attr)
        #def append_in_file(src, content, start='    appRoutes:', end=('','class')):

        #    met = False

        #    for line in fileinput.input(src, inplace=1):
        #        if line.startswith(start):
        #            met = True
        #        elif line.startswith(end):
        #            print 'foo bar'

        print 'Append route in app/static/js/router.coffee'
        append_string = "    new App.Routers.%ss controller: new App.Controllers.%ss()" \
                        % (self.resource.title(), self.resource.title())
        append_in_file('app/static/js/router.coffee', append_string)
                        

