from app.models import db, User_Language, environment, SCHEMA
from sqlalchemy.sql import text


def seed_user_languages():
    russian = User_Language(
        user_id = 1,
        language_id = 1
    )
    portuguese = User_Language(
        user_id = 1,
        language_id = 2
    )
    chinese = User_Language(
        user_id = 1,
        language_id = 3
    )


    db.session.add(russian)
    db.session.add(portuguese)
    db.session.add(chinese)
    db.session.commit()


def undo_user_languages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM User_Language"))


    db.session.commit()
