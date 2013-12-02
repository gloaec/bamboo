from bamboo.model import *
from . import constants as USER

class User(Base):

    __tablename__ = 'user'
    __public__    = ['id', 'name', 'email']

    id            = Column(Integer,      primary_key=True)
    name          = Column(String(50),   unique=True)
    email         = Column(String(120),  unique=True)
    password      = Column(String(120))
    role          = Column(SmallInteger, default=USER.USER)
    status        = Column(SmallInteger, default=USER.NEW)

    def __init__(self, name=None, email=None, password=None):
        self.name = name
        self.email = email
        self.password = password

    def getStatus(self):
        return USER.STATUS[self.status]

    def getRole(self):
        return USER.ROLE[self.role]

    def __repr__(self):
        return '<User %r>' % (self.name)

