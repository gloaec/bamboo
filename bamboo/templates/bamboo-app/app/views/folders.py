# -*- coding: utf-8 -*-
from flask import render_template
from bamboo.application import View
from app.models import Folder

view = View(__name__, url_prefix='/folders')

""" Jinga Templates """

#@view.route('/')
#def index():
#    return render_template('folders/index.html.haml', folders=Folder.all())
