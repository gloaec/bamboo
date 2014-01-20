# -*- coding: utf-8 -*-
from datetime import datetime, date
import re
import inflect
from flask import json
from sqlalchemy.orm import class_mapper
from sqlalchemy.ext.declarative import as_declarative, declared_attr

from .extensions import db

___all___ = ['Base', 'Column', 'ForeignKey', 'now', 'utcnow',
            'Date', 'DateTime', 'Float', 'Integer', 'SmallInteger', 
            'String', 'Unicode', 'Text', 'relationship', 'backref']

Column       = db.Column
ForeignKey   = db.ForeignKey
Date         = db.Date
DateTime     = db.DateTime
Float        = db.Float
Integer      = db.Integer
SmallInteger = db.SmallInteger
String       = db.String
Unicode      = db.Unicode
Text         = db.Text

relationship = db.relationship
backref      = db.backref
now          = datetime.now
utcnow       = datetime.utcnow

dthandler = lambda obj: \
        obj.isoformat() \
        if isinstance(obj, datetime) \
        or isinstance(obj, date) else None

def _class2tablename(classname):
    s1 = inflect.engine().plural_noun(classname)
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', s1)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

@as_declarative()
class Base(object):
    """ Define Base model with useful methods """

    """ Default Attributes """
    id          = Column(db.Integer, primary_key=True)
    created_at  = Column(db.DateTime, default=datetime.utcnow)
    updated_at  = Column(db.DateTime, onupdate=datetime.utcnow)

    @declared_attr
    def __tablename__(cls):
        """ By default, pluralize class name for tablename """
        return _class2tablename(cls.__name__)

    @property
    def __public__(self):
        """ By default, serialize all attributes """
        return [c.name for c in self.__class__.__table__.columns]

    def __repr__(self):
        return '<%s #%s>' % [self.__class__.__name__, self.id]

    @property
    def serialize(self):
        """ Return object data in easily serializeable format """
        obj = {}
        try:
            for public_key in self.__public__:
                value = getattr(self, public_key)
                if isinstance(value, db.Model):
                    obj[public_key] = value.serialize
                elif value:
                    obj[public_key] = value
        except AttributeError, e: print(e)
        return obj

    @property
    def to_json(self):
        """ Return json string of the object """
        return json.dumps(self.serialize, default=dthandler)
