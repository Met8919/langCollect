from flask import Blueprint, jsonify, session, request
from app.models import Language, db, User


language_routes = Blueprint('languages',__name__)



@language_routes.route('',methods={'GET'})
def get_languages():

    languages = db.session.query(Language).all()


    languages = [language.to_dict() for language in languages]

    print(languages,'--------------------------')


    return languages
