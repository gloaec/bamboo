# -*- coding: utf-8 -*-
from flask import Blueprint, render_template

from .todos import todos

__all__ = ['create_app']

DEFAULT_BLUEPRINTS = [
    todos
]

def create_app(app, blueprints=None):
    """ Initiate module with current_app """

    if not blueprints:
        blueprints = DEFAULT_BLUEPRINTS

    configure_blueprints(app, blueprints)
    configure_routes(app)

    return Blueprint('todos_app', __name__, 
                    static_folder   = 'static', 
                    template_folder = 'templates')


def configure_routes(app):
    """ Define some routes directly pluggable to the application """

    # Marionette Routes
    @app.route('/todos')
    @app.route('/todos/<path:hashbang>')
    def todos_app(hashbang=None):
        return render_template('app.html')
    # facultative if using @app.route('/<path:hashbang>')


def configure_blueprints(app, blueprints):
    """ Configure blueprints in views """
    
    for blueprint in blueprints:
        app.register_blueprint(blueprint)

