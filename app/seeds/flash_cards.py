from app.models import db, Language, environment, SCHEMA, Flash_Card
from sqlalchemy.sql import text


def seed_flash_cards():
    card1 = Flash_Card(
        deck_id = 1,
        front = 'Test front',
        back = 'test back'

    )
    card2 = Flash_Card(
        deck_id = 2,
        front = 'Test front',
        back = 'test back'

    )
    card3 = Flash_Card(
        deck_id = 3,
        front = 'Test front',
        back = 'test back'

    )
    card4 = Flash_Card(
        deck_id = 1,
        front = 'Test front2',
        back = 'test back2'

    )
    card5 = Flash_Card(
        deck_id = 4,
        front = 'Test front4',
        back = 'test back4'

    )


    db.session.add(card1)
    db.session.add(card2)
    db.session.add(card3)
    db.session.add(card4)
    db.session.add(card5)
    db.session.commit()


def undo_flash_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.flash_cards RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM flash_cards"))


    db.session.commit()
