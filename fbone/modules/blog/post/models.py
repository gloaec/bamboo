from flask import json
from sqlalchemy import Column, types
from datetime import datetime, date

from fbone.model import *
from fbone.extensions import db

class Affix(db.Model, Base): pass

class Post(db.Model, Base):

    __tablename__ = 'posts'
    __public__    = [
            'id', 'title', 'content', 'created_at', 'updated_at',
            'author', 'author_id'
    ]

    id          = Column(Integer, primary_key=True)
    title       = Column(String)
    content     = Column(Text)
    created_at  = Column(DateTime, default=datetime.utcnow)
    updated_at  = Column(DateTime, onupdate=datetime.utcnow)
    author_id   = Column(Integer, ForeignKey("users.id"))
    author      = relationship("User", uselist=False, backref="posts")

    def __repr__(self):
        return '<Post #%s>' % self.id
