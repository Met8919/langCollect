

import googletrans
from googletrans import Translator

from flask import Blueprint, request, jsonify
from flask_login import login_required




translate_routes = Blueprint('translate', __name__)




@translate_routes.route('',methods=['POST'])
def translate():

    try:
        data = request.get_json()
        word = data['word']
        language = data['language']

        translator = Translator()
        translation = translator.translate(word,src=language, dest='English')



        return jsonify(translation.text)

    except Exception as e:

        return jsonify({'error': 'An error occurred while translating the text. Please try again later.'}), 500
