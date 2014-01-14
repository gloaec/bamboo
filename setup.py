<<<<<<< HEAD
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
=======
"""
Flask-Bamboo
--------------
"""
import sys
from setuptools import setup

# Hack to prevent stupid TypeError: 'NoneType' object is not callable error on
# exit of python setup.py test # in multiprocessing/util.py _exit_function when
# running python setup.py test (see
# https://github.com/pypa/virtualenv/pull/259)
try:
    import multiprocessing
except ImportError:
    pass

install_requires = [
    'cssmin', 'pyyaml',
    'Flask-SQLAlchemy',
    'Flask-Assets',
    'Flask-Babel',
    'Hamlish-Jinja',
    'Mako'
]
if sys.version_info < (2, 7):
    install_requires += ['argparse']

setup(
    name='Bamboo',
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
        'bamboo.alembic',
        'bamboo.alembic.ddl',
        'bamboo.alembic.autogenerate'
    ],
    zip_safe=False,
    install_requires=install_requires,
    tests_require=[
        'pytest',
    ],
    platforms='any',
    classifiers=[
        'Development Status :: 1 - Beta',
>>>>>>> c1fa362d9f2c75b47e47ebdc0e8b9e79958a15ff
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
<<<<<<< HEAD
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
        'Topic :: Software Development :: Libraries'
    ]
=======
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
        'Topic :: Software Development :: Libraries :: Python Modules'
    ],
    entry_points = {
      'console_scripts': [ 'bamboo = bamboo:main' ],
    },
    include_package_data=True
>>>>>>> c1fa362d9f2c75b47e47ebdc0e8b9e79958a15ff
)
