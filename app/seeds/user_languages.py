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



    db.session.add(russian)
    db.session.add(portuguese)

    db.session.commit()


def undo_user_languages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_languages RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM user_languages"))


    db.session.commit()
