from .db import db, environment, SCHEMA, add_prefix_for_prod

class Language(db.Model):

    __tablename__ = 'languages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    words = db.relationship('Known_Word', back_populates='language')
    users = db.relationship('User_Language', back_populates='language')
    decks = db.relationship('Deck', back_populates='language')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,

        }
