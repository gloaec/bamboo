from bamboo.application import db
from sqlalchemy.ext.declarative import declarative_base
import json

___all___ = ['Base', 'Column', 'Foreignkey', 
            'Date', 'Datetime', 'Float' 'Integer', 'String', 'Unicode']

Column = db.Column
Foreignkey = db.ForeignKey
Date = db.Date
Datetime = db.DateTime
Float = db.Float
Integer = db.Integer
String = db.String
Unicode = db.Unicode

class Collection(list):
    def __init__(self, *args, **kwargs):
        super(Collection, self).__init__(args[0])

    def to_dict(self):
        return [model.to_dict() for model in self]

    def to_json(self):
        return json.dumps(self.to_dict())

class BaseModel(db.Model):

    __tablename__ = "Base"

    id = Column(Integer, primary_key=True)

    def __repr__(self):
        return '<Base Model>'

    #def __new__(cls):
    #    if cls==Base:
    #        raise TypeError, "You can not instantiate a BaseModel"
    #    return super(Base, cls).__new__(cls)
   
    """ RESTful methods """

    @classmethod
    def all(cls):
        return Collection(db.session.query(cls).all())

    @classmethod
    def first(cls):
        return db.session.query(cls).first()

    @classmethod
    def last(cls):
        return db.session.query(cls).order_by(cls.id.desc()).limit(1).one()

    @classmethod
    def find(cls, id):
        return db.session.query(cls).get(id)

    @classmethod
    def count(cls, *attr):
        return db.session.query(cls).count()

    @classmethod
    def where(cls, **attr):
        return Collection(db.session.query(cls).filter_by(**attr).all())

    @classmethod
    def new(cls, **attr):
        return db.session.add(cls(**attr))

    @classmethod
    def create(cls, **attr):
        print 'CREATE %s(%s)' % (cls.__name__, str(attr))
        model = cls.new(**attr)
        try: db.session.commit()
        except Exception, e: print(e); db.session.rollback()
        return model

    def update(self, **attr):
        pass       

    def delete(self):
        db.session.delete(self)

    def to_dict(self):
        dict = {}
        for public_key in self.__public__:
            value = getattr(self, public_key)
            if value:
                dict[public_key] = value
        return dict

    def to_json(self):
        return json.dumps(self.to_dict())


Base = declarative_base(cls=BaseModel)
