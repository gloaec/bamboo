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
    ├── __init__.py            (Module global declarations)
    ├── myblueprint            (Blueprint inside module)
    │   ├── __init__.py
    │   ├── models.py
    │   ├── views.py
    │   ├── constants.py
    │   ├── decorators.py
    │   └── forms.py
    ├── static                 (Modules Static Files)
    │   ├── css
    │   │   └── mymodule.css
    │   ├── js
    │   │   └── mymodule.js
    │   └── img
    └── templates              (Jinga2 Templates)
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

### Structure

    mymodule
    ├── __init__.py                                               (Module global declarations)
    ├── myblueprint                                               (Blueprint inside module)
    │   ├── __init__.py
    │   ├── models.py
    │   ├── views.py
    │   ├── constants.py
    │   └── decorators.py
    └── static                                                    (Modules Static Files)
        ├── css
        │   └── mymodule.css
        ├── js
        │   ├── apps                                              (Marionette Modules)
        │   │   └── myblueprint
        │   │       ├── list
        │   │       │   ├── templates
        │   │       │   │   ├── layout_view.html
        │   │       │   │   ├── _list_view.html
        │   │       │   │   └── _item_view.html
        │   │       │   ├── list_controller.js
        │   │       │   └── list_view.js
        │   │       ├── new
        │   │       │   ├── templates
        │   │       │   │   └── item_view.html
        │   │       │   ├── new_controller.js
        │   │       │   └── new_view.js
        │   │       ├── show
        │   │       │   ├── templates
        │   │       │   │   └── item_view.html
        │   │       │   ├── show_controller.js
        │   │       │   └── show_view.js
        │   │       └── edit
        │   │           ├── templates
        │   │           │   └── item_view.html
        │   │           ├── edit_controller.js
        │   │           └── edit_view.js
        │   ├── config                                            (Javascript Envrinement Configuration)
        │   ├── components                                        (Application Components (reusable))
        │   ├── controllers                                       (Application Controllers)
        │   ├── entities                                          (Entities = Models / Collections)
        │   ├── views                                             (Application Views)
        │   └── mymodule.js                                       (Module Global Declarations)
        └── img
