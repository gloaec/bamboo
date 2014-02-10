from bamboo.model import *
from app.extensions import db

class Affix(Base): pass

class Post(Base):

    __tablename__ = 'posts'
    __public__    = [
            'id', 'title', 'content', 'created_at', 'updated_at',
            'author', 'author_id'
    ]

    title       = Column(String)
    content     = Column(Text)
    author_id   = Column(Integer, ForeignKey("users.id"))
    author      = relationship("User", uselist=False, backref="posts")

    def __repr__(self):
        return '<Post #%s>' % self.id
