# -*- coding: utf-8 -*-
from flask import Blueprint

__all__ = ['create_app']

def create_app(app):
    return Blueprint('movies', __name__, 
                    static_folder   = 'static', 
                    template_folder = 'templates')
