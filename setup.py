# -*- coding: utf-8 -*-

from setuptools import setup

project = "bambooapp"

setup(
    name=project,
    version='0.1',
    url='https://github.com/gloaec/bambooapp',
    description='Bamboo (Backbone marionette Bootstrap) is a Flask (Python microframework) application boilerplate/framework',
    author='Ghislain Loaec',
    author_email='gloaec@cadoles.com',
    packages=["bambooapp"],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'Flask',
        'Flask-SQLAlchemy',
        'Flask-WTF',
        'Flask-Script',
        'Flask-Babel',
        'Flask-Testing',
        'Flask-Mail',
        'Flask-Cache',
        'Flask-Login',
        'Flask-OpenID',
        'Flask-Assets',
        'nose',
        'mysql-python',
        'inflect'
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
    ]
)
