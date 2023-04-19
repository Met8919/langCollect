from .db import db, environment, SCHEMA, add_prefix_for_prod

class Deck(db.Model):

    __tablename__ = 'decks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String, nullable= False)
    language_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('languages.id')), nullable=False)

    user = db.relationship('User', back_populates='decks')
    flash_cards = db.relationship('Flash_Card', back_populates='deck')
    language = db.relationship('Language', back_populates='decks')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title
        }
