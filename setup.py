# -*- coding: utf-8 -*-

from setuptools import setup

project = "bamboo"

setup(
    name=project,
    version='0.0.1',
    url='http://github.com/gloaec/bamboo',
    license='GPLv3',
    author='Ghislain Loaec',
    author_email='gloaec@cadoles.com',
    maintainer='Ghislain Loaec',
    maintainer_email='gloaec@cadoles.com',
    description='Flask Application Development Framework',
    long_description=__doc__,
    packages=[
        'bamboo',
        'bamboo.managers',
        'bamboo.utils',
        'bamboo.alembic',
        'bamboo.alembic.ddl',
        'bamboo.alembic.autogenerate'
    ],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'Flask >= 0.10',
        'SQLAlchemy >= 0.9',
        'Flask-SQLAlchemy >= 0.9',
        'Flask-WTF >= 0.9',
        'Flask-Script',
        'Flask-Babel',
        'Flask-Testing',
        'Flask-Mail',
        'Flask-Cache',
        'Flask-Login',
        'Flask-OpenID',
        'Flask-Assets >= 0.8',
        'nose',
        'mysql-python',
        'inflect',
        'Mako',
        'cssmin',
        'pyyaml'
    ],
    test_suite='tests',
    classifiers=[
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
        'Topic :: Software Development :: Libraries'
    ],
    platforms='any',
    entry_points = {
      'console_scripts': [ 'bamboo = bamboo:main' ],
    },
)
