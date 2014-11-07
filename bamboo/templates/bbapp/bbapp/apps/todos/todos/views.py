from flask import Blueprint, json, request
from flask.ext.login import current_user

from bbapp.ext import db
from .models import Todo


todos = Blueprint('todos', __name__, url_prefix='/api/todos')


@todos.route('',  methods=['GET'])
def list_all_todos():
    """ List all todos """
    return json.dumps([todo.serialize for todo in Todo.query.all()])


@todos.route('',  methods=['POST'])
def create_todo():
    """ Create a new todo """
    todo = Todo(**request.json)
    db.session.add(todo)
    db.session.commit()
    return json.dumps(todo.serialize)
    

@todos.route('/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    """ Update a todo by id """
    todo = Todo.query.get_or_404(todo_id)
    todo.content = request.json.get('content', None)
    todo.is_completed = request.json.get('is_completed', False)
    db.session.commit()
    return json.dumps(todo.serialize)


@todos.route('/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    """ Delete a todo by id """
    todo = Todo.query.get_or_404(todo_id)
    db.session.delete(todo)
    db.session.commit()
    return todo.to_json
