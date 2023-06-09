from app.models import db, Language, environment, SCHEMA, Deck
from sqlalchemy.sql import text


def seed_decks():
    deck1 = Deck(
        user_id = 1,
        title = 'Basic Russian',
        language_id = 1

    )

    deck2 = Deck(
        user_id = 1,
        title = 'Basic Portuguese',
        language_id = 2

    )
    deck3 = Deck(
        user_id = 1,
        title = 'Basic French',
        language_id = 4

    )
    deck4 = Deck(
        user_id = 1,
        title = 'Basic German',
        language_id = 5

    )


    db.session.add(deck1)
    db.session.add(deck2)
    db.session.add(deck3)
    db.session.add(deck4)
    db.session.commit()


def undo_decks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.decks RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM decks"))


    db.session.commit()
