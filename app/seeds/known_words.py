from app.models import db, Language, environment, SCHEMA, Known_Word
from sqlalchemy.sql import text


def seed_known_words():
    word1 = Known_Word(
        user_id = 1,
        language_id = 2,
        word = 'oi'

    )
    word2 = Known_Word(
        user_id = 1,
        language_id = 2,
        word = 'eu'

    )
    word3 = Known_Word(
        user_id = 1,
        language_id = 2,
        word = 'quero'

    )


    db.session.add(word1)
    db.session.add(word2)
    db.session.add(word3)
    db.session.commit()


def undo_known_words():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.known_words RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM known_words"))


    db.session.commit()
