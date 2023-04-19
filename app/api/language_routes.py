from flask import Blueprint, jsonify, session, request
from app.models import Language, db, User, User_Language


language_routes = Blueprint('languages',__name__)



@language_routes.route('',methods={'GET'})
def get_languages():

    languages = db.session.query(Language).all()


    languages = {language.name: language.to_dict() for language in languages}


    return languages

@language_routes.route('/<int:userId>')
def getUserLanguages(userId):

    languages  = db.session.query(User,User_Language,Language)\
        .select_from(User)\
        .join(User_Language)\
        .join(Language)\
        .filter(User.id == 1)\
        .all()




    # languages = {language.name: language.to_dict() for user,user_language, language in languages}

    languages_dict  = {}
    for user,user_language, language in languages:

        languages_dict[language.name] = language.to_dict()


    return languages_dict
