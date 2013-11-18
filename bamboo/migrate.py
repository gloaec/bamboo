class Migrate(object):
    def __init__(self, app = None, db = None):
        if app is not None and db is not None:
            self.init_app(app, db)
        
    def init_app(self, app, db):
        if not hasattr(app, 'extensions'):
            app.extensions = {}
        app.extensions['migrate'] = db
