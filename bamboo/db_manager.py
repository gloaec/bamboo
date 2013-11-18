import os
import sys

from .manager import Manager
from .alembic.config import Config
from .alembic import command
from .util import basedir, find_subclasses

_basedir = basedir()
sys.path.append(_basedir)
from app import models, db

def _get_config(directory):
    config = Config(os.path.join(_basedir, 'config', 'database.ini'))
    config.set_main_option('script_location', os.path.join(_basedir, directory))
    return config


db_manager = Manager(usage = 'Perform database migrations')

    
@db_manager.option('-d', '--directory', dest='directory', default='db', 
            help="Migration script directory (default is 'db')")
def init(directory):
    "Generates a new migration"
    config = Config()
    config.set_main_option('script_location', directory)
    config.config_file_name = os.path.join(directory, 'database.yml')
    command.init(config, directory, 'flask')


@db_manager.option('-d', '--directory', dest='directory', default='db', 
            help = "Migration script directory (default is 'db')")
def current(directory):
    "Display the current revision for each database."
    config = _get_config(directory)
    command.current(config)


@db_manager.option('-r', '--rev-range', dest='rev_range', default=None, 
            help="Specify a revision range; format is [start]:[end]")
@db_manager.option('-d', '--directory', dest='directory', default='db', 
            help = "Migration script directory (default is 'db')")
def history(directory, rev_range):
    "List changeset scripts in chronological order."
    config = _get_config(directory)
    command.history(config)


@db_manager.option('--sql', dest='sql', action='store_true', default=False, 
            help = "Don't emit SQL to database - dump to standard output instead")
@db_manager.option('--autogenerate', dest='autogenerate', action='store_true', 
            default=False, help="Populate revision script with andidatea \
            migration operatons, based on comparison of database to model")
@db_manager.option('-m', '--message', dest='message', default=None)
@db_manager.option('-d', '--directory', dest='directory', default='db', 
            help="Migration script directory (default is 'db')")
def revision(directory, message, autogenerate, sql):
    "Create a new revision file."
    config = _get_config(directory)
    command.revision(config, message, autogenerate = autogenerate, sql = sql)


@db_manager.option('--tag', dest='tag', default=None, 
            help="Arbitrary 'tag' name - can be used by custom env.py scripts")
@db_manager.option('--sql', dest='sql', action='store_true', default=False, 
            help="Don't emit SQL to database - dump to standard output instead")
@db_manager.option('-m', '--message', dest='message', default=None)
@db_manager.option('-d', '--directory', dest='directory', default='db', 
            help="Migration script directory (default is 'db')")
def migrate(directory, message, sql, tag):
    "Alias for 'revision --autogenerate'"
    config = _get_config(directory)
    command.revision(config, message, autogenerate = True, sql = sql)
    command.upgrade(config, 'head', sql = sql, tag = tag)


@db_manager.option('--tag', dest='tag', default=None, 
            help="Arbitrary 'tag' name - can be used by custom env.py scripts")
@db_manager.option('--sql', dest='sql', action='store_true', default=False, 
            help="Don't emit SQL to database - dump to standard output instead")
@db_manager.option('revision', default=None, 
            help="revision identifier")
@db_manager.option('-d', '--directory', dest='directory', default='db',
            help = "Migration script directory (default is 'db')")
def stamp(directory, revision, sql, tag):
    "'stamp' the revision table with the given revision; don't run any migrations"
    config = _get_config(directory)
    command.stamp(config, revision, sql = sql, tag = tag)


@db_manager.option('--tag', dest='tag', default=None, 
            help="Arbitrary 'tag' name - can be used by custom env.py scripts")
@db_manager.option('--sql', dest='sql', action='store_true', default=False, 
            help="Don't emit SQL to database - dump to standard output instead")
@db_manager.option('revision', nargs='?', default='head', 
            help="revision identifier")
@db_manager.option('-d', '--directory', dest='directory', default='db', 
            help="Migration script directory (default is 'db')")
def upgrade(directory, revision, sql, tag):
    "Upgrade to a later version"
    config = _get_config(directory)
    command.upgrade(config, revision, sql = sql, tag = tag)

    
@db_manager.option('--tag', dest='tag', default=None, 
            help="Arbitrary 'tag' name - can be used by custom env.py scripts")
@db_manager.option('--sql', dest='sql', action='store_true', default=False, 
            help="Don't emit SQL to database - dump to standard output instead")
@db_manager.option('revision', nargs='?', default="-1", 
            help="revision identifier")
@db_manager.option('-d', '--directory', dest='directory', default='db', 
            help="Migration script directory (default is 'db')")
def downgrade(directory, revision, sql, tag):
    "Revert to a previous version"
    config = _get_config(directory)
    command.downgrade(config, revision, sql = sql, tag = tag)


@db_manager.option('-d', '--directory', dest='directory', default='db', 
            help="Migration script directory (default is 'db')")
def seed(directory):
    "Populate database with data from `db/seeds.py`"
    try:
        execfile(os.path.join(_basedir, directory, 'seeds.py'))
    except IntegrityError, e:
        print "Integrity Error: ", str(e)



@db_manager.command
def empty():
    "Empty all tables in database"
    if prompt_bool("Are you sure you want to lose all your records"):
        for model in find_subclasses(models):
            print 'Empty %s ...' % model.__name__
            db.session.query(model).delete(synchronize_session=False)
        db.session.commit()


@db_manager.command
def drop():
    "Drop all tables in database"
    if prompt_bool("Are you sure you want to lose all your data"):
        db.drop_all()
        db.session.commit()
