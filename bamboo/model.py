# -*- coding: utf-8 -*-
import re
import inflect
import sys
from datetime import datetime, date
from flask import json
from sqlalchemy.orm import class_mapper
from sqlalchemy.ext.declarative import as_declarative, declared_attr
from bamboo.utils import basedir

_basedir = basedir()
sys.path.append(_basedir)

from app.extensions import db
#----------------------

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


class Collection(list):
    def __init__(self, *args, **kwargs):
        super(Collection, self).__init__(args[0])

    def to_dict(self):
        return [model.to_dict() for model in self]

    def to_json(self):
        return json.dumps(self.to_dict())


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

    """ RESTful methods """

    @classmethod
    def all(cls):
        return Collection(db.session.query(cls).all())

    @classmethod
    def first(cls):
        return db.session.query(cls).first()

    @classmethod
    def last(cls):
        return db.session.query(cls).order_by(cls.id.desc()).limit(1).one()

    @classmethod
    def find(cls, id):
        return db.session.query(cls).get(id)

    @classmethod
    def count(cls, *attr):
        return db.session.query(cls).count()

    @classmethod
    def where(cls, **attr):
        return Collection(db.session.query(cls).filter_by(**attr).all())

    @classmethod
    def new(cls, **attr):
        model = cls(**attr)
        db.session.add(model)
        return model

    @classmethod
    def create(cls, **attr):
        print 'CREATE %s(%s)' % (cls.__name__, str(attr))
        model = cls.new(**attr)
        try: db.session.commit()
        except Exception, e: print(e); db.session.rollback()
        return model

    def update(self, **attr):
        for key, val in attr.items():
            print key, val
            setattr(self, key, val)
        try: db.session.commit()
        except Exception, e: print(e); db.session.rollback()
        return self

    def delete(self):
        db.session.delete(self)
        try: db.session.commit()
        except Exception, e: print(e); db.session.rollback()
        return None

#Base = declarative_base(cls=BaseModel)
