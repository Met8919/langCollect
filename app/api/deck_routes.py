from flask import Blueprint, jsonify, session, request
from app.models import Deck, db, User, Flash_Card
from flask_login import current_user, login_required

deck_routes = Blueprint('decks',__name__)







@deck_routes.route('/<int:deckId>',methods=['PUT'])
def updateDeck(deckId):


    deck = request.get_json()


    deck_to_update = Deck.query.get(deck['id'])

    # add validations
    deck_to_update.title = deck['title']
    db.session.commit()




    return {"message" : 'success'}





@deck_routes.route('/<int:langId>',methods=['GET'])
def getUserDecks(langId):



    decks = db.session.query(Deck)\
        .filter(Deck.language_id == langId, Deck.user_id == current_user.id )\
        .all()



    all_decks = {}


    for deck in decks:

        if deck.id not in all_decks:
            flash_cards = deck.flash_cards
            all_decks[deck.id] = deck.to_dict()
            for card in flash_cards:
                if 'flashCards' not in all_decks[deck.id]:
                    all_decks[deck.id]['flashCards'] = {}
                all_decks[deck.id]['flashCards'][card.id] = card.to_dict()

    # print(all_decks,'==========================================')
    # print('==========================================')
    # print('==========================================')

    return all_decks




@deck_routes.route('/<int:langId>',methods=['POST'])
def createDeck(langId):

    data = request.get_json()
    title = data['title']


    print('===================================================')


    new_deck = Deck(
        user_id = current_user.id,
        title = title,
        language_id = langId

    )
    db.session.add(new_deck)
    db.session.commit()

    return new_deck.to_dict()


@deck_routes.route('/<int:deckId>', methods=['DELETE'])
def delete_deck(deckId):


    deck_to_delete = Deck.query.get(deckId)


    db.session.delete(deck_to_delete)
    db.session.commit()

    return ''
