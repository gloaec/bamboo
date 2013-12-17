Bamboo Module
=============

Flask Blueprint
---------------

### When to use blueprint ?

Everytime you need to create a new resource, a new route (api or jinga distibuting),
or any new component of the application. 

### Structure

    myblueprint
    ├── __init__.py               (Global module declarations)
    ├── models.py                 (Database Schema extension)
    ├── views.py                  (Blueprint routes definition)
    ├── constants.py              (Blueprint Constants)
    ├── decorators.py             (Decorating Functions)
    └── forms.py                  (WTF Forms)


Flask Module
------------

### When to use module ?

A module isnt standalone. A module isnt a component which the application depends on.
Create a module to add some new features to the application. (=plugin)

### Structure

    mymodule
    ├── __init__.py
    ├── myblueprint
    │   ├── __init__.py
    │   ├── models.py
    │   ├── views.py
    │   ├── constants.py
    │   ├── decorators.py
    │   └── forms.py
    ├── static
    │   ├── css
    │   │   └── mymodule.css
    │   ├── js
    │   │   └── mymodule.js
    │   └── img
    └── templates
        └── myblueprint
            ├── index.html
            ├── new.html
            ├── show.html
            ├── edit.html
            └── _row.html

Marionette Module
-----------------

### Why preferring marionette module ?

Smoother/Auto integration
