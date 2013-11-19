Bamboo
============


Get Started
-----------
 
1. `git clone https://github.com/gloaec/bamboo.git` Clone the project
2. `cd bamboo` Go to the project directory
3. `[sudo] python setup.py install` Install Bamboo & cies
4. `bamboo new <app_name>` Create a new application
5. `cd <app_bamboo>` Go to the new application root
6. `bamboo server` Browse to [localhost:8080](http://localhost:8080)

Bamboo Features
---------------

Bamboo aims to provide architecture, environment, command line utilities and
methods for any-scale application developpment. Intended to indented code lovers, 
bamboo bootstraps all the good practices of modern RESTful application
deployment.


Bamboo Application Tree
-----------------------

    bamboo-app
    ├── app
    │   ├── __init__.py
    │   ├── models
    │   │   ├── user.py
    │   │   ├── post.py
    │   │   ├── comment.py
    │   │   └── __init__.py
    │   ├── static
    │   │   ├── all.css
    │   │   ├── all.js
    │   │   ├── templates.js
    │   │   ├── css
    │   │   │   ├── application.sass
    │   │   │   ├── fonts.scss
    │   │   │   └── lib
    │   │   │       ├── bootstrap
    │   │   │       ├── \_icons.scss
    │   │   │       ├── font-awesome.css
    │   │   │       ├── font-awesome-ie7.css
    │   │   │       └── font-mfizz.css
    │   │   ├── fonts
    │   │   │   └── icons
    │   │   │       ├── <bootstrap-glyphicons>
    │   │   │       ├── <fontawesome-icons>
    │   │   │       ├── <fontmfizz-icons>
    │   │   │       └── <application-icons>
    │   │   ├── img
    │   │   │   ├── bg-default.png
    │   │   │   └── vectors
    │   │   │       ├── bamboo.svg
    │   │   │       └── <custom.svg: icon-#{custom}>
    │   │   ├── js
    │   │   │   ├── application.js.coffee
    │   │   │   ├── lib
    │   │   │   │   ├── backbone.js
    │   │   │   │   ├── backbone-marionette.js
    │   │   │   │   ├── backbone-stickit.js
    │   │   │   │   ├── backbone-validation.js
    │   │   │   │   ├── bamboo.js.coffee
    │   │   │   │   ├── bootstrap.js
    │   │   │   │   ├── coffeescript.js
    │   │   │   │   ├── haml.js
    │   │   │   │   ├── jquery.js
    │   │   │   │   ├── json2.js
    │   │   │   │   ├── underscore.js
    │   │   │   │   └── underscore-string.js
    │   │   │   ├── models
    │   │   │   │   ├── user.js.coffee
    │   │   │   │   ├── post.js.coffee
    │   │   │   │   └── comment.js.coffee
    │   │   │   ├── router.js.coffee
    │   │   │   ├── routers
    |   |   |   |   ├── sessions.js.coffee
    |   |   |   |   ├── comments.js.coffee
    │   │   │   │   └── posts.js.coffee
    │   │   │   └── views
    │   │   │       ├── sessions
    │   │   │       │   └── new.js.coffee
    │   │   │       └── posts
    │   │   │           ├── index.js.coffee
    │   │   │           ├── new.js.coffee
    │   │   │           ├── show.js.coffee
    │   │   │           ├── edit.js.coffee
    │   │   │           └── post.js.coffee
    │   │   └── templates
    │   │       ├── core
    │   │       │   └── alert.hamlc
    │   │       ├── sessions
    │   │       │   └── new.hamlc
    │   │       ├── posts
    │   │       |   ├── edit.hamlc
    │   │       |   ├── index.hamlc
    │   │       |   ├── new.hamlc
    │   │       |   ├── post.hamlc
    │   │       |   └── show.hamlc
    │   │       └── comments
    │   │           ├── edit.hamlc
    │   │           ├── index.hamlc
    │   │           ├── new.hamlc
    │   │           ├── comment.hamlc
    │   │           └── show.hamlc
    │   ├── templates
    │   │   ├── 404.html.haml
    │   │   └── index.html.haml
    │   ├── views.py
    │   └── views.pyc
    ├── config
    │   ├── application.py <or> application.yml
    │   └── database.ini
    ├── db
    │   ├── application.db
    │   ├── env.py
    │   ├── README
    │   ├── script.py.mako
    │   ├── seeds.py
    │   └── versions
    │       └── <#{migration-version-number}_{migration-stamp}>.py
    ├── LICENSE
    └── README.md

Usage
-----

* `bamboo server [-h] [-d DEBUG] [-p PORT] [-s HOST]`

  Runs the Flask development server i.e. app.run()

* `bamboo console [-h] [--no-ipython] [--no-bpython]`
  
  Runs a Python shell inside Flask application context.

* `bambo db [-h]`
  
  Perform database migrations

  * `bamboo db upgrade [-h] [-d DIRECTORY] [--sql] [--tag TAG] [revision]`
  
    Upgrade to a later version

  * `bamboo db migrate [-h] [-d DIRECTORY] [-m MESSAGE] [--sql]`
    
    Alias for `revision --autogenerate`

  * `bamboo db drop [-h]`

    Drop all tables in database

  * `bamboo db current [-h] [-d DIRECTORY]`
    
    Display the current revision for each database.

  * `bamboo db stamp [-h] [-d DIRECTORY] [--sql] [--tag TAG] revision`
    
    Stamp the revision table with the given revision;
    
    Don't run any migrations

  * `bamboo db init [-h] [-d DIRECTORY]`
    
    Generates a new migration

  * `bamboo db seed [-h]`
    
    Populate database with data from `db/seeds.py`

  * `bamboo db downgrade  [-h] [-d DIRECTORY] [--sql] [--tag TAG] [revision]`
    
    Revert to a previous version

  * `bamboo db history [-h] [-d DIRECTORY] [-r REV_RANGE]`
    
    List changeset scripts in chronological order.

  * `bamboo db empty [-h]`
    
    Empty all tables in database

  * `bamboo db revision [-h] [-d DIRECTORY] [-m MESSAGE] [--autogenerate] [--sql]`
    
    Create a new revision file.



