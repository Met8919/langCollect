from app.models import db, Language, environment, SCHEMA, Flash_Card
from sqlalchemy.sql import text


def seed_flash_cards():
    card1 = Flash_Card(
        deck_id = 1,
        front = 'Я',
        back = 'I'

    )
    card2 = Flash_Card(
        deck_id = 1,
        front = 'что',
        back = 'What'

    )
    card3 = Flash_Card(
        deck_id = 1,
        front = 'как',
        back = 'how, as, like'

    )
    card4 = Flash_Card(
        deck_id = 1,
        front = 'э́то',
        back = 'this is,that is'

    )
    card5 = Flash_Card(
        deck_id = 1,
        front = 'но',
        back = 'but'
    )

    card6 = Flash_Card(
        deck_id = 1,
        front = 'кото́рый',
        back = 'which'
    )



    cardB1 = Flash_Card(
        deck_id = 2,
        front = 'semana',
        back = 'week'
    )

    cardB2 = Flash_Card(
        deck_id = 2,
        front = 'hoje',
        back = 'today'
    )

    cardB3 = Flash_Card(
        deck_id = 2,
        front = 'amanhã',
        back = 'tomorrow'
    )


    cardB4 = Flash_Card(
        deck_id = 2,
        front = 'ontem',
        back = 'yesterday'
    )


    cardB5 = Flash_Card(
        deck_id = 2,
        front = 'hora',
        back = 'hour'
    )


    cardB6 = Flash_Card(
        deck_id = 2,
        front = 'relógio ',
        back = 'clock'
    )




    cardF1 = Flash_Card(
        deck_id = 3,
        front = 'Merci ',
        back = 'Thank you'
    )
    cardF2 = Flash_Card(
        deck_id = 3,
        front = 'jamais ',
        back = 'never'
    )
    cardF3 = Flash_Card(
        deck_id = 3,
        front = 'comme ',
        back = 'like, as'
    )
    cardF4 = Flash_Card(
        deck_id = 3,
        front = 'ensemble ',
        back = 'together'
    )
    cardF5 = Flash_Card(
        deck_id = 3,
        front = 'mais ',
        back = 'but'
    )
    cardF6 = Flash_Card(
        deck_id = 3,
        front = 'assez ',
        back = 'enough'
    )



    cardG1 = Flash_Card(
        deck_id = 4,
        front = 'Woche',
        back = 'week'
    )
    cardG2 = Flash_Card(
        deck_id = 4,
        front = 'Jahr',
        back = 'year'
    )
    cardG3 = Flash_Card(
        deck_id = 4,
        front = 'heute',
        back = 'today'
    )
    cardG4 = Flash_Card(
        deck_id = 4,
        front = 'morgen',
        back = 'tomorrow'
    )
    cardG5 = Flash_Card(
        deck_id = 4,
        front = 'gestern',
        back = 'yesterday'
    )
    cardG6 = Flash_Card(
        deck_id = 4,
        front = 'Kalender',
        back = 'calendar'
    )




















    db.session.add(card1)
    db.session.add(card2)
    db.session.add(card3)
    db.session.add(card4)
    db.session.add(card5)
    db.session.add(card6)

    db.session.add(cardB1)
    db.session.add(cardB2)
    db.session.add(cardB3)
    db.session.add(cardB4)
    db.session.add(cardB5)
    db.session.add(cardB6)

    db.session.add(cardF1)
    db.session.add(cardF2)
    db.session.add(cardF3)
    db.session.add(cardF4)
    db.session.add(cardF5)
    db.session.add(cardF6)

    db.session.add(cardG1)
    db.session.add(cardG2)
    db.session.add(cardG3)
    db.session.add(cardG4)
    db.session.add(cardG5)
    db.session.add(cardG6)


    db.session.commit()


def undo_flash_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.flash_cards RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM flash_cards"))


    db.session.commit()
