# -*- coding: utf-8 -*-
from flask import Blueprint

__all__ = ['create_mod']

def create_mod(app):
    return Blueprint('movies', __name__, 
                    static_folder   = 'static', 
                    template_folder = 'templates')
