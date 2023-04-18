from .db import db, environment, SCHEMA, add_prefix_for_prod

class User_Language(db.Model):

    __tablename__ = 'user_languages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('languages.id')), nullable= False)


    user = db.relationship('User',back_populates='my_languages')
    language = db.relationship('Language', back_populates='users')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'languageId': self.language_id
        }
