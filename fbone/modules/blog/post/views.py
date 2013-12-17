from flask import Blueprint, json, request
from flask.ext.login import current_user

from fbone.extensions import db
from .models import Post


posts = Blueprint('posts', __name__, url_prefix='/api/posts')


@posts.route('',  methods=['GET'])
def list_posts():
    """ List all posts """
    return json.dumps([post.serialize for post in Post.query.all()])


@posts.route('',  methods=['POST'])
def create_post():
    """ Create a new post """
    post = Post(author=current_user, **request.json)
    db.session.add(post)
    db.session.commit()
    return json.dumps(post.serialize)


@posts.route('/<int:post_id>', methods=['GET'])
def get_post(post_id):
    """ Get a post by id """
    return Post.query.get_or_404(post_id).to_json


@posts.route('/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    """ Update a post by id """
    for key in ['id', 'author', 'author_id', 'created_at', 'updated_at']:
        if request.json.get(key, None) is not None:
            del request.json[key] 
    Post.query.filter_by(id=post_id).update(request.json)
    db.session.commit()
    return Post.query.get_or_404(post_id).to_json


@posts.route('/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    """ Delete a post by id """
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return post.to_json
