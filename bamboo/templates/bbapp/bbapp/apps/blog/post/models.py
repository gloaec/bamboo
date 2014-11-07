from bamboo.model import *
from bbapp.models import User

class Post(Base):

    __tablename__ = 'posts'
    __public__    = [
            'id', 'title', 'content', 'created_at', 'updated_at',
            'author', 'author_id', 'comments'
    ]

    id          = Column(Integer, primary_key=True)
    title       = Column(String(50))
    content     = Column(Text)
    author_id   = Column(Integer, ForeignKey("users.id"))
    author      = relationship("User", uselist=False, backref="posts")

    def __repr__(self):
        return '<Post #%s>' % self.id
