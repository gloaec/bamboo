# -*- coding: utf-8 -*-
from flask import Blueprint

from .post import posts

__all__ = ['create_mod']

DEFAULT_BLUEPRINTS = [
    posts
]

def create_mod(app, blueprints=None):

    if not blueprints:
        blueprints = DEFAULT_BLUEPRINTS

    configure_blueprints(app, blueprints)
    configure_routes(app)

    return Blueprint('social', __name__, 
                    static_folder   = 'static', 
                    template_folder = 'templates')


def configure_routes(app):
    """ Define some routes directly pluggable to the application """


    @app.route('/foo')
    def foo():
        return 'bar'


def configure_blueprints(app, blueprints):
    """ Configure blueprints in views """

    for blueprint in blueprints:
        app.register_blueprint(blueprint)
