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
    'Flask',
    'cssmin'
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
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
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
)
