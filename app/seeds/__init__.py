from flask.cli import AppGroup
from .users import seed_users, undo_users
from .languages import seed_Languages, undo_languages
from .user_languages import seed_user_languages, undo_user_languages

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
        undo_user_languages()
        undo_languages()
        undo_users()
    seed_users()
    seed_Languages()
    seed_user_languages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_user_languages()
    undo_languages()

    # Add other undo functions here
