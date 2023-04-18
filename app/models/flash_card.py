from .db import db, environment, SCHEMA, add_prefix_for_prod

class Flash_Card(db.Model):

    __tablename__ = 'flash_cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    deck_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('decks.id')), nullable=False)
    front = db.Column(db.String, nullable=False)
    back = db.Column(db.String, nullable=False)

    deck = db.relationship('Deck', back_populates='flash_cards')



    def to_dict(self):
        return {
            "id": self.id,
            'deckId': self.deck_id,
            'front': self.front,
            'back': self.back,


        }
