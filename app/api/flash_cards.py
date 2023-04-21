from flask import Blueprint, jsonify, session, request
from app.models import Deck, db, User, Flash_Card
from flask_login import current_user, login_required


flash_card_routes = Blueprint('flash_cards',__name__)





@flash_card_routes.route('',methods=['PUT'])
def updateCards():

    cards = request.get_json()
    print(cards)


    for card in cards:
        card_to_update = Flash_Card.query.get(card['id'])

        card_to_update.front = card['front']
        card_to_update.back = card['back']
        db.session.commit()


    return {"messsage" : "success"}



@flash_card_routes.route('',methods=['POST'])
def createFlashCards():

    data = request.get_json()
    id = data['id']
    cards = data['cards']

    for card in cards:
        new_card = Flash_Card(
            deck_id = id,
            front = card['front'],
            back = card['back']
        )
        db.session.add(new_card)
        db.session.commit()

    print(cards,'==============================================')
    return {"message" : "success"}



@flash_card_routes.route('/<int:cardId>',methods=['DELETE'])
def deleteCard(cardId):


    card_to_delete = Flash_Card.query.get(cardId)
    db.session.delete(card_to_delete)
    db.session.commit()




    return {"message": "success"}
