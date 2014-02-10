from bb_app.models import *
from bb_app import db
"""
Populate the database with the artificial data below :

"""

user1 = User(name='admin', email='admin@example.com', password='$admin&123456$')
db.session.add(user1)
