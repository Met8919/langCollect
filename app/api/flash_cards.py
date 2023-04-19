from flask import Blueprint, jsonify, session, request
from app.models import Deck, db, User, Flash_Card
from flask_login import current_user, login_required


flash_card_routes = Blueprint('flash_cards',__name__)


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
