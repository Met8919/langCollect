from app.models import db, Language, environment, SCHEMA
from sqlalchemy.sql import text


def seed_Languages():
    russian = Language(
        name = 'Russian'
    )
    portuguese = Language(
        name = 'Portuguese'
    )
    
    english = Language(
        name = 'English'
    )
    french = Language(
        name = 'French'
    )
    german = Language (
        name = "German"
    )
    bulgarian = Language(
        name ='Bulgarian'
    )
    ukrainian = Language(
        name = 'Ukrainian'
    )

    spanish = Language(
        name = 'Spanish'
    )



    db.session.add(russian)
    db.session.add(portuguese)
    
    db.session.add(english)
    db.session.add(french)
    db.session.add(german)

    db.session.add(bulgarian)
    db.session.add(ukrainian)
    db.session.commit()


def undo_languages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.languages RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM languages"))


    db.session.commit()
