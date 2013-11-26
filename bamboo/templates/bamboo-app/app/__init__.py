from flask import render_template
from bamboo.application import app, db, assets
from bamboo.model import Collection
from app.models import Folder

@app.route('/')
@app.route('/<path:hashbang>') # Marionette Application
def root(hashbang=None):
    folders = Folder.all()
    return render_template('index.haml', **locals())
