from bamboo.model import *
from bbapp.models import User

class Comment(Base):

    __tablename__ = 'comments'
    __public__    = [
            'id', 'title', 'content', 'created_at', 'updated_at',
            'author', 'author_id'
    ]
    
    id          = Column(Integer, primary_key=True)
    title       = Column(String(50))
    content     = Column(Text)
    author_id   = Column(Integer, ForeignKey("users.id"))
    author      = relationship("User", uselist=False, backref="comments")
    post_id     = Column(Integer, ForeignKey("posts.id"))
    post        = relationship("Post", uselist=False, backref="comments")

    def __repr__(self):
        return '<Comment #%s>' % self.id
