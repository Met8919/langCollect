from flask import Blueprint, jsonify, session, request
from app.models import Language, db, User, User_Language
from flask_login import current_user, login_required

language_routes = Blueprint('languages',__name__)



@language_routes.route('',methods={'GET'})
def get_languages():

    languages = db.session.query(Language).all()


    languages = {language.name: language.to_dict() for language in languages}


    return languages

@language_routes.route('/<int:userId>')
def get_user_languages(userId):

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


@language_routes.route('/<int:langId>',methods=['DELETE'])
def delete_user_language(langId):

    language_to_delete = db.session.query(User_Language).filter(User_Language.language_id == langId, User_Language.user_id == current_user.id).first()
    print(language_to_delete)
    db.session.delete(language_to_delete)
    db.session.commit()
    return {"message" : 'success'}



@language_routes.route('',methods=['POST'])
def create_user_language():

    language = request.get_json()


    new_user_language = User_Language(
        user_id = current_user.id,
        language_id = language['id']

    )
    db.session.add(new_user_language)
    db.session.commit()

    return {'message': 'success'}
