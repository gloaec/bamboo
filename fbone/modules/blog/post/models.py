from flask import json
from sqlalchemy import Column, types
from datetime import datetime, date
from fbone.extensions import db

dthandler = lambda obj: \
        obj.isoformat() \
        if isinstance(obj, datetime) \
        or isinstance(obj, date) else None

class Post(db.Model):

    __tablename__ = 'posts'
    __public__    = ['id', 'title', 'content', 'created_at', 'updated_at',
    'author', 'author_id']

    id          = Column(db.Integer, primary_key=True)
    title       = Column(db.String)
    content     = Column(db.Text)
    created_at  = Column(db.DateTime, default=datetime.utcnow)
    updated_at  = Column(db.DateTime, onupdate=datetime.utcnow)
    author_id   = Column(db.Integer, db.ForeignKey("users.id"))
    author      = db.relationship("User", uselist=False, backref="posts")

    def __repr__(self):
        return '<Post #%s>' % self.id

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

