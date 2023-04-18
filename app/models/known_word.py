from .db import db, environment, SCHEMA, add_prefix_for_prod

class Known_Word(db.Model):

    __tablename__ = 'known_words'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('languages.id')), nullable=False)
    word = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='known_words')
    language = db.relationship('Language', back_populates='words')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'languageId': self.language_id,
            'word': self.word


        }
