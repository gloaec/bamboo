# -*- coding: utf-8 -*-
from os.path import join, abspath, dirname
root_path = dirname(dirname(abspath(__file__)))

""" Application Config """

APP_NAME                  = "Flask-Bamboo"
DEBUG                     = True
PORT                      = 8080

ADMINS                    = frozenset(['admin'])
SECRET_KEY                = 'SecretKeyForSessionSigning'

SQLALCHEMY_DATABASE_URI   = 'sqlite:///' + join(root_path, 'db', 'application.db')
DATABASE_CONNECT_OPTIONS  = {}

THREADS_PER_PAGE          = 8

CSRF_ENABLED              = True
CSRF_SESSION_KEY          = "somethingimpossibletoguess"

RECAPTCHA_USE_SSL         = False
RECAPTCHA_PUBLIC_KEY      = '6LeYIbsSAAAAACRPIllxA7wvXjIE411PfdB2gt2J'
RECAPTCHA_PRIVATE_KEY     = '6LeYIbsSAAAAAJezaIq3Ft_hSTo0YtyeFG-JgRtu'
RECAPTCHA_OPTIONS         = {'theme': 'white'}
