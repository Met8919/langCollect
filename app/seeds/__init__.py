from flask.cli import AppGroup
from .languages import seed_Languages, undo_languages
from .user_languages import seed_user_languages, undo_user_languages
from .users import seed_users, undo_users
from .decks import seed_decks, undo_decks
from .flash_cards import seed_flash_cards, undo_flash_cards
from .known_words import seed_known_words, undo_known_words


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_flash_cards()
        undo_user_languages()
        undo_decks()
        undo_known_words()
        undo_languages()
        undo_users()

    seed_users()
    seed_Languages()
    seed_user_languages()
    seed_known_words()
    seed_decks()
    seed_flash_cards()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_flash_cards()
    undo_user_languages()
    undo_decks()
    undo_known_words()
    undo_languages()
    undo_users()
    # Add other undo functions here
