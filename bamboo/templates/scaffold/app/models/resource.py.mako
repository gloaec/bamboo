# -*- coding: utf-8 -*-
from bamboo.model import *

class ${resource.title()}(Base):

    __tablename__ = '${resource}'
    __public__    = ${str(attributes.keys())}  # ['id', 'name', 'description']

    ${attributes.columns()}
    #id            = Column(Integer, primary_key=True)
    #name          = Column(String, unique=True)
    #description   = Column(Unicode(255))

    def __init__(self, ${attributes.parameters()}):

        ${attributes.instances()}

    def __repr__(self):
        return '<${resource.title()} %s>' % self.id
