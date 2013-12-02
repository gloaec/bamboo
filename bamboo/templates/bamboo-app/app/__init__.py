from flask import render_template
from bamboo.application import app, db, assets
from bamboo.model import Collection

from .models import Folder

#from .users.views import mod as usersModule
#from .users.decorators import requires_login
#from .users.models import User
#app.register_blueprint(usersModule)

@app.route('/')
@app.route('/<path:hashbang>') # Marionette Application
def root(hashbang=None):
    #folders = Folder.all()
    return render_template('index.haml', **locals())


