from flask import Blueprint
movies = Blueprint('movies', __name__, static_folder='static')
