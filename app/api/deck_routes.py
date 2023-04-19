from flask import Blueprint, jsonify, session, request
from app.models import Deck, db, User, Flash_Card
from flask_login import current_user, login_required

deck_routes = Blueprint('decks',__name__)


@deck_routes.route('/<int:langId>',methods=['GET'])
def getUserDecks(langId):



    decks = db.session.query(Deck)\
        .filter(Deck.language_id == langId, Deck.user_id == current_user.id )\
        .all()



    all_decks = {}


    for deck in decks:

        if deck.title not in all_decks:
            flash_cards = deck.flash_cards
            all_decks[deck.title] = deck.to_dict()
            for card in flash_cards:
                if 'flashCards' not in all_decks[deck.title]:
                    all_decks[deck.title]['flashCards'] = {}
                all_decks[deck.title]['flashCards'][card.id] = card.to_dict()



    return all_decks
