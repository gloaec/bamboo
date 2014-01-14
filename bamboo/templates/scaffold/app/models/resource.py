# -*- coding: utf-8 -*-
from bamboo.model import *

class {{ resource.title() }}(Base):

    __tablename__ = '{{ resource }}'
    __public__    = {{ attributes.keys() }}

    {{attributes.columns()}}

    def __init__(self, {{ attributes.parameters() }}):

        {{ attributes.instances() }}

    def __repr__(self):
        return '<{{ resource.title() }} %s>' % self.id
