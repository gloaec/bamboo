from app.models import *
"""
Populate the database with the artificial data below :

"""

model1 = Folder.create(name='app',    description=u"Contains the application itself")
model2 = Folder.create(name='config', description=u"Application configuration")
model3 = Folder.create(name='db',     description=u"Database / Migrations / Seeds")
