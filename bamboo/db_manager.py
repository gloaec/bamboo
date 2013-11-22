import os
import sys

from sqlalchemy.exc import IntegrityError

from .manager import Manager
from .commands import Command, Option
from .alembic.config import Config
from .alembic import command, package_dir
from .util import basedir, find_subclasses
from .cli import prompt, prompt_pass, prompt_bool, prompt_choices

_basedir = basedir()
sys.path.append(_basedir)
from app import models
from .application import db

def _get_config(directory):
    config = Config(os.path.join(_basedir, 'config', 'database.ini'))
    config.set_main_option('script_location', os.path.join(_basedir, directory))
    return config


class DBManager(Manager):
    
    help = description = usage = "Performs Database migration"

    def add_default_commands(self):
        self.add_command('init', DBInit())
        self.add_command('current', DBCurrent())
        self.add_command('history', DBHistory())
        self.add_command('revision', DBRevision())
        self.add_command('migrate', DBMigrate())
        self.add_command('stamp', DBStamp())
        self.add_command('upgrade', DBUpgrade())
        self.add_command('downgrade', DBDowngrade())
        self.add_command('seed', DBSeed())
        self.add_command('empty', DBEmpty())
        self.add_command('drop', DBDrop())


class DBInit(Command):

    help = description = "Generates a new migration"

    def __init__(self, directory='db'):
        self.directory = directory

    def get_options(self):
        return (
            Option('-d', '--directory', dest='directory', default='db', 
                    help="Migration script directory (default is 'db')"),
        )

    def run(self, directory):
        config = Config()
        directory = os.path.join(_basedir, directory)
        config.set_main_option('script_location', directory)
        config.config_file_name = os.path.join(directory, 'database.yml')
        command.init(config, directory, 'flask')


class DBCurrent(Command):

    help = description = "Display the current revision for each database."

    def __init__(self, directory='db'):
        self.directory = directory

    def get_options(self):
        return (
            Option('-d', '--directory', dest='directory', default='db', 
                    help = "Migration script directory (default is 'db')"),
        )

    def run(self, directory):
        config = _get_config(directory)
        command.current(config)


class DBHistory(Command):

    help = description = "List changeset scripts in chronological order."

    def __init__(self, directory='db', rev_range=None):
        self.directory = directory
        self.rev_range = rev_range

    def get_options(self):
        return (
            Option('-r', '--rev-range', dest='rev_range', default=None, 
                help="Specify a revision range; format is [start]:[end]"),
            Option('-d', '--directory', dest='directory', default='db', 
                help = "Migration script directory (default is 'db')"),
        )

    def run(self, directory, rev_range):
        config = _get_config(directory)
        command.history(config)


class DBRevision(Command):

    help = description = "Create a new revision file."

    def __init__(self, directory='db', message=None, autogenerate=False,
                    sql=False, template_dir=None):
        self.directory = directory
        self.message = message
        self.autogenerate = autogenerate
        self.sql = sql
        self.template_dir = template_dir

    def get_options(self):
        return (
            Option('--sql', dest='sql', action='store_true', default=False, 
                help = "Don't emit SQL to database - dump to standard output instead"),
            Option('--autogenerate', dest='autogenerate', action='store_true', 
                default=False, help="Populate revision script with andidatea \
                migration operatons, based on comparison of database to model"),
            Option('-m', '--message', dest='message', default=None),
            Option('-d', '--directory', dest='directory', default='db', 
                help="Database directory (default is 'db')"),
            Option('-t', '--template-dir', dest='template_dir', default=None, 
                help="Template script directory"),
        )

    def run(self, directory, message, autogenerate, sql, template_dir):
        config = _get_config(directory)
        if template_dir: template_dir = os.path.join(_basedir, template_dir)
        command.revision(config, message, autogenerate = autogenerate, sql = sql,
                        template_dir= template_dir)


class DBMigrate(Command):

    help = description = "Alias for 'revision --autogenerate'"

    def __init__(self, directory='db', message=None, sql=False, tag=None):
        self.directory = directory
        self.message = message
        self.sql = sql
        self.tag = tag

    def get_options(self):
        return (
            Option('--tag', dest='tag', default=None, 
                help="Arbitrary 'tag' name - can be used by custom env.py scripts"),
            Option('--sql', dest='sql', action='store_true', default=False, 
                help="Don't emit SQL to database - dump to standard output instead"),
            Option('-m', '--message', dest='message', default=None),
            Option('-d', '--directory', dest='directory', default='db', 
                help="Migration script directory (default is 'db')"),
        )

    def run(self, directory, message, sql, tag):
        config = _get_config(directory)
        command.revision(config, message, autogenerate = True, sql = sql)
        command.upgrade(config, 'head', sql = sql, tag = tag)


class DBStamp(Command):

    help = description = "'stamp' the revision table with the given revision; don't run any migrations"

    def __init__(self, directory='db', revision=None, sql=False, tag=None):
        self.directory = directory
        self.revision = revision
        self.sql = sql
        self.tag = tag

    def get_options(self):
        return (
            Option('--tag', dest='tag', default=None, 
                help="Arbitrary 'tag' name - can be used by custom env.py scripts"),
            Option('--sql', dest='sql', action='store_true', default=False, 
                help="Don't emit SQL to database - dump to standard output instead"),
            Option('revision', default=None, 
                help="revision identifier"),
            Option('-d', '--directory', dest='directory', default='db',
                help = "Migration script directory (default is 'db')"),
        )

    def run(self, directory, revision, sql, tag):
        config = _get_config(directory)
        command.stamp(config, revision, sql = sql, tag = tag)


class DBUpgrade(Command):

    help = description = "Upgrade to a later version"

    def __init__(self, directory='db', revision='head', sql=False, tag=None):
        self.directory = directory
        self.revision = revision
        self.sql = sql
        self.tag = tag

    def get_options(self):
        return (
            Option('--tag', dest='tag', default=None, 
                help="Arbitrary 'tag' name - can be used by custom env.py scripts"),
            Option('--sql', dest='sql', action='store_true', default=False, 
                help="Don't emit SQL to database - dump to standard output instead"),
            Option('revision', nargs='?', default='head', 
                help="revision identifier"),
            Option('-d', '--directory', dest='directory', default='db', 
                help="Migration script directory (default is 'db')"),
        )

    def run(self, directory, revision, sql, tag):
        config = _get_config(directory)
        command.upgrade(config, revision, sql = sql, tag = tag)


class DBDowngrade(Command):

    help = description = "Revert to a previous version"

    def __init__(self, directory='db', revision='head', sql=False, tag=None):
        self.directory = directory
        self.revision = revision
        self.sql = sql
        self.tag = tag

    def get_options(self):
        return (
            Option('--tag', dest='tag', default=None, 
                help="Arbitrary 'tag' name - can be used by custom env.py scripts"),
            Option('--sql', dest='sql', action='store_true', default=False, 
                help="Don't emit SQL to database - dump to standard output instead"),
            Option('revision', nargs='?', default='-1', 
                help="revision identifier"),
            Option('-d', '--directory', dest='directory', default='db', 
                help="Migration script directory (default is 'db')"),
        )

    def run(self, directory, revision, sql, tag):
        config = _get_config(directory)
        command.downgrade(config, revision, sql = sql, tag = tag)


class DBSeed(Command):

    help = description = "Populate database with data from `db/seeds.py`"
    
    def __init__(self, directory='db'):
        self.directory = directory

    def get_options(self):
        return (
            Option('-d', '--directory', dest='directory', default='db', 
                help="Migration script directory (default is 'db')"),
        )

    def run(self, directory):
        try:
            execfile(os.path.join(_basedir, directory, 'seeds.py'))
        except IntegrityError, e:
            print "Integrity Error: ", str(e)


class DBEmpty(Command):

    help = description = "Empty all tables in database"
    
    def __init__(self, directory='db'):
        self.directory = directory

    def get_options(self):
        return (
            Option('-d', '--directory', dest='directory', default='db', 
                help="Migration script directory (default is 'db')"),
        )

    def run(self, directory):
        if prompt_bool("Are you sure you want to lose all your records"):
            for model in find_subclasses(models):
                print 'Empty %s ...' % model.__name__
                db.session.query(model).delete(synchronize_session=False)
            db.session.commit()


class DBDrop(Command):

    help = description = "Drop all tables in database"
    
    def run(self, directory='db'):
        self.directory = directory

    def get_options(self):
        return [
            Option('-d', '--directory', dest='directory', default='db', 
                help="Migration script directory (default is 'db')"),
        ]

    def run(self, directory):
        if prompt_bool("Are you sure you want to lose all your data"):
            db.drop_all()
            db.session.commit()
