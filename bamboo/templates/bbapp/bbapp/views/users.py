# -*- coding: utf-8 -*-
import os

from flask import Blueprint, render_template, send_from_directory, abort
from flask import current_app as app
from flask.ext.login import login_required, current_user

from ..models import User
#----------------------

users = Blueprint('users', __name__, url_prefix='/users')


@users.route('/')
@login_required
def index():
    if not current_user.is_authenticated():
        abort(403)
    return render_template('users/index.html', user=current_user)


@users.route('/<int:user_id>/profile')
def profile(user_id):
    user = User.get_by_id(user_id)
    return render_template('users/profile.html', user=user)


@users.route('/<int:user_id>/avatar/<path:filename>')
@login_required
def avatar(user_id, filename):
    dir_path = os.path.join(app.config['UPLOAD_FOLDER'], 'user_%s' % user_id)
    return send_from_directory(dir_path, filename, as_attachment=True)
