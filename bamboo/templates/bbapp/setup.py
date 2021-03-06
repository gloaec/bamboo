# -*- coding: utf-8 -*-

from setuptools import setup

project = "bbapp"

setup(
    name=project,
    version='0.1',
    url='{{ project.url }}',
    description='{{ project.description }}',
    author='{{ project.author }}',
    author_email='{{ project.author.email }}',
    #packages=["bbapp"],
    include_package_data=True,
    zip_safe=False,
    install_requires=['bamboo', 'Flask-Migrate'],
    test_suite='tests',
    classifiers=[
        'Environment :: Web Environment',
    ]
)

