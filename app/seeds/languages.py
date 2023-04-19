from app.models import db, Language, environment, SCHEMA
from sqlalchemy.sql import text


def seed_Languages():
    russian = Language(
        name = 'Russian'
    )
    portuguese = Language(
        name = 'Portuguese'
    )
    chinese = Language(
        name = 'Chinese'
    )


    db.session.add(russian)
    db.session.add(portuguese)
    db.session.add(chinese)
    db.session.commit()


def undo_languages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.languages RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM languages"))


    db.session.commit()
