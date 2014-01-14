from bamboo.model import *

class Folder(Base):

    __tablename__ = 'folder'
    __public__    = ['id', 'name', 'description']

    id            = Column(Integer, primary_key=True)
    name          = Column(String, unique=True)
    description   = Column(Unicode(255))

    def __init__(self, name="", description=""):
        self.name = name
        self.description = description

    def __repr__(self):
        return '<Folder %s>' % self.name
