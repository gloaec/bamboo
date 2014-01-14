# -*- coding: utf-8 -*-
from bamboo.model import *

class Post(Base):

    __tablename__ = 'post'
    __public__    = ['id', 'title', 'content']

    id = Column(Integer, primary_key=True)
    title = Column(String)
    content = Column(String)

    def __init__(self, title=None, content=None):

        self.title = title
        self.content = content

    def __repr__(self):
        return '<Post %s>' % self.id
