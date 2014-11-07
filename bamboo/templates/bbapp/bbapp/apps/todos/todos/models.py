from bamboo.model import *
from bbapp.models import User

class Todo(Base):

    __tablename__ = 'todos'
    __public__    = [
            'id', 'content', 'created_at', 'updated_at',
            'is_completed'
    ]
    
    id          = Column(Integer, primary_key=True)
    content     = Column(Text)
    is_completed= Column(Boolean, default=False)

    def __repr__(self):
        return '<Todo #%s>' % self.id
