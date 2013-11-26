# -*- coding: utf-8 -*-
from flask import render_template
from bamboo.application import View
from app.models import {{ resource.title() }}

view = View(__name__) 
# You can specify url_prefix='/prefix'
# Default: url_prefix='/{{ resource }}'

""" Jinga Templates """

@view.route('/')
def index():
    return render_template('{{ resource }}/index.html.haml', {{ resource }}={{ resource.title() }}.all())
