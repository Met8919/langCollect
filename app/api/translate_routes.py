

import googletrans
from googletrans import Translator

from flask import Blueprint, request, jsonify
from flask_login import login_required




translate_routes = Blueprint('translate', __name__)




@translate_routes.route('',methods=['POST'])
def translate():

    data = request.get_json()


    translator = Translator()
    translation = translator.translate(data, dest='English')

    print(translation,'--=-=-as=dao=sd-a=sdoahsdkhaksdhkjasdhkjashd')


    return jsonify(translation.text)
