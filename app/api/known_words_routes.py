from flask import Blueprint, jsonify, session, request
from app.models import Deck, db, User, Flash_Card, Known_Word
from flask_login import current_user, login_required





known_words_routes = Blueprint('known_words',__name__)




@known_words_routes.route('/<int:langId>', methods=['GET'])
def get_known_words(langId):

    words = db.session.query(Known_Word).filter(Known_Word.language_id == langId, Known_Word.user_id == current_user.id).all()

    word_dict = {}

    for word in words:
        word_dict[word.word] = word.to_dict()

    return word_dict


@known_words_routes.route('/<int:langId>', methods=['POST'])
def add_word(langId):

    data = request.get_json()

    print(data)
    return ''
