from .db import db, environment, SCHEMA, add_prefix_for_prod

class Language(db.Model):

    __tablename__ = 'languages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Integer, nullable=False)

    words = db.relationship('Know_Word', back_populates='language')
    users = db.relationship('User_language', back_populates='language')
    decks = db.relationship('Deck', back_populates='language')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,

        }
