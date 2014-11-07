from flask import Blueprint, json, request
from flask.ext.login import current_user

from bbapp.ext import db
from .models import Comment

comments = Blueprint('comments', __name__, url_prefix='/api/comments')

@comments.route('/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    """ Delete a comment by id """
    comment = Comment.query.get_or_404(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return ""
