Bamboo Boilerplate
==================

Server
------

### Flask [http://flask.pocoo.org/](http://flask.pocoo.org/)

Flask is a microframework for Python based on Werkzeug, Jinja 2 and good intentions.

#### Flask-SQLAlchemy [http://pythonhosted.org/Flask-SQLAlchemy/](http://pythonhosted.org/Flask-SQLAlchemy/)

Flask-SQLAlchemy is an extension for Flask that adds support for SQLAlchemy to your 
application. It requires SQLAlchemy 0.6 or higher. It aims to simplify using 
SQLAlchemy with Flask by providing useful defaults and extra helpers that make it 
easier to accomplish common tasks.

#### Flask-WTF [https://flask-wtf.readthedocs.org/en/latest/](https://flask-wtf.readthedocs.org/en/latest/)

Forms provide the highest level API in WTForms. They contain your field definitions, 
delegate validation, take input, aggregate errors, and in general function as the 
glue holding everything together.

* Integration with wtforms.
* Secure Form with csrf token.
* Global csrf protection.
* Recaptcha supporting.
* File upload that works with Flask-Uploads.
* Internationalization integeration.

#### Flask-Script [http://flask-script.readthedocs.org/en/latest/](http://flask-script.readthedocs.org/en/latest/)

The Flask-Script extension provides support for writing external scripts in Flask. 
This includes running a development server, a customised Python shell, scripts to 
set up your database, cronjobs, and other command-line tasks that belong outside 
the web application itself.

#### Flask-Babel [http://pythonhosted.org/Flask-Babel/](http://pythonhosted.org/Flask-Babel/)

Flask-Babel is an extension to Flask that adds i18n and l10n support to any Flask 
application with the help of babel, pytz and speaklater. It has builtin support for 
date formatting with timezone support as well as a very simple and friendly interface 
to gettext translations.

#### Flask-Testing [http://pythonhosted.org/Flask-Testing/](http://pythonhosted.org/Flask-Testing/)

The Flask-Testing extension provides unit testing utilities for Flask.

#### Flask-Mail [http://pythonhosted.org/flask-mail/](http://pythonhosted.org/flask-mail/)

One of the most basic functions in a web application is the ability to send emails 
to your users.

The Flask-Mail extension provides a simple interface to set up SMTP with your Flask 
application and to send messages from your views and scripts.

#### Flask-Cache [http://pythonhosted.org/Flask-Cache/](http://pythonhosted.org/Flask-Cache/)

Adds easy cache support to Flask.

#### Flask-Login [https://flask-login.readthedocs.org/en/latest/](https://flask-login.readthedocs.org/en/latest/)

Flask-Login provides user session management for Flask. It handles the common tasks 
of logging in, logging out, and remembering your users’ sessions over extended 
periods of time.

It will:

* Store the active user’s ID in the session, and let you log them in and out easily.
* Let you restrict views to logged-in (or logged-out) users.
* Handle the normally-tricky “remember me” functionality.
* Help protect your users’ sessions from being stolen by cookie thieves.
* Possibly integrate with Flask-Principal or other authorization extensions later on.

However, it does not:

* Impose a particular database or other storage method on you. You are entirely in 
  charge of how the user is loaded.
* Restrict you to using usernames and passwords, OpenIDs, or any other method of 
  authenticating.
* Handle permissions beyond “logged in or not.”
* Handle user registration or account recovery.

#### Flask-OpenID [http://pythonhosted.org/Flask-OpenID/](http://pythonhosted.org/Flask-OpenID/)

Flask-OpenID is an extension to Flask that allows you to add OpenID based authentication 
to your website in a matter of minutes.

#### Flask-Assets [http://elsdoerfer.name/docs/flask-assets/](http://elsdoerfer.name/docs/flask-assets/)

Flask-Assets helps you to integrate webassets into your Flask application.





Client
------

### json2 [https://github.com/douglascrockford/JSON-js](https://github.com/douglascrockford/JSON-js)

This file creates a JSON property in the global object, if there
isn't already one, setting its value to an object containing a stringify
method and a parse method. The parse method uses the eval method to do the
parsing, guarding it with several regular expressions to defend against
accidental code execution hazards. On current browsers, this file does nothing,
prefering the built-in JSON object.

### jquery [http://jquery.com/](http://jquery.com/)

jQuery is a fast, small, and feature-rich JavaScript library. It makes things 
like HTML document traversal and manipulation, event handling, animation, and 
Ajax much simpler with an easy-to-use API that works across a multitude of 
browsers. With a combination of versatility and extensibility, jQuery has 
changed the way that millions of people write JavaScript.

### bootstrap [http://getbootstrap.com/](http://getbootstrap.com/)

Bootstrap is a sleek, intuitive, and powerful front-end framework for faster and 
easier web development. A 12-column responsive grid, dozens of components, 
JavaScript plugins, typography, form controls, and even a web-based Customizer 
to make Bootstrap your own

### underscore [http://underscorejs.org/](http://underscorejs.org/)

Underscore is a utility-belt library for JavaScript that provides a lot of the 
functional programming support that you would expect in Prototype.js (or Ruby), 
but without extending any of the built-in JavaScript objects. It's the tie to go 
along with jQuery's tux, and Backbone.js's suspenders. 

### underscore.string [http://epeli.github.io/underscore.string/](http://epeli.github.io/underscore.string/)

Underscore.string is JavaScript library for comfortable manipulation with strings, 
extension for Underscore.js inspired by Prototype.js, Right.js, Underscore and 
beautiful Ruby language.

Underscore.string provides you several useful functions: 

capitalize, clean, includes, count, escapeHTML, unescapeHTML, insert, splice, 
startsWith, endsWith, titleize, trim, truncate and so on.

### backbone [http://backbonejs.org/](http://backbonejs.org/)

Backbone.js gives structure to web applications by providing models with key-value 
binding and custom events, collections with a rich API of enumerable functions, 
views with declarative event handling, and connects it all to your existing API 
over a RESTful JSON interface.

#### backbone.marionette [http://marionettejs.com](http://marionettejs.com/)

Backbone.Marionette is a composite application library for Backbone.js that aims 
to simplify the construction of large scale JavaScript applications.

It is a collection of common design and implementation patterns found in the 
applications that we have been building with Backbone, and includes pieces 
inspired by composite application architectures, event-driven architectures, 
messaging architectures, and more. 

#### backbone.marionette.subrouter [https://github.com/whyohwhyamihere/backbone.marionette.subrouter](https://github.com/whyohwhyamihere/backbone.marionette.subrouter)

The Backbone Marionette Documentation suggests splitting controllers and routers 
up among your various modules to reduce the load on any single file and better 
modularize code, yet provides no easy means of doing so.

Backbone Marionette Subrouter extends the Marionette AppRouter and allows for 
multiple smaller routers to be used in conglomeration with the base router. 
The base router no longer needs to be enormous and can instead be relegated to 
delegating paths to the new subrouters.

#### backbone.stickit [http://nytimes.github.io/backbone.stickit/](http://nytimes.github.io/backbone.stickit/)

Backbone's philosophy is for a View, the display of a Model's state, to re-render 
after any changes have been made to the Model. This works beautifully for simple 
apps, but rich apps often need to render, respond, and synchronize changes with 
finer granularity.

Stickit is a Backbone data binding plugin that binds Model attributes to View 
elements with a myriad of options for fine-tuning a rich app experience. 
Unlike most model binding plugins, Stickit does not require any extra markup in 
your html; in fact, Stickit will clean up your templates, as you will need to 
interpolate fewer variables (if any at all) while rendering. In Backbone style, 
Stickit has a simple and flexible api which plugs in nicely to a View's lifecycle.

#### backbone.memento [https://github.com/derickbailey/backbone.memento](https://github.com/derickbailey/backbone.memento)

Memento push and pop for Backbone.js models and collections structures.

A view may offer some editing capabilities that directly modify a structure 
(model or collection), directly. If you want to cancel the changes after they 
have already been applied to the structure, you will have to make a round trip 
to the back-end server or other origin of the structures's data to do so.

With the memento pattern and the Backbone.Memento plugin, you do not need to make 
any round trips.

#### backbone.validation [https://github.com/thedersen/backbone.validation](https://github.com/thedersen/backbone.validation)

Good client side validation is an important part of giving your users a great 
experience when they visit your site. Backbone provides a validate method, but 
it is left undefined and it is up to you to override it with your custom validation 
logic. Too many times I have seen validation implemented as lots of nested ifs and 
elses. This quickly becomes a big mess. One other thing is that with libraries like 
Backbone, you hold your state in a Model, and don't tie it to the DOM. Still, 
when validating your models you probably want to inform your users about errors etc., 
which means modifying the DOM.

Backbone.Validation tries to solve both these problems. It gives you a simple, 
extensible way of declaring validation rules on your model, and overrides Backbone's 
validate method behind the scene. And, it gives you a nice hook where you can implement 
your own way of showing the error messages to your user.


### coffeescript [http://coffeescript.org/](http://coffeescript.org/)

CoffeeScript is a little language that compiles into JavaScript. Underneath that awkward 
Java-esque patina, JavaScript has always had a gorgeous heart. CoffeeScript is an attempt 
to expose the good parts of JavaScript in a simple way.

The golden rule of CoffeeScript is: "It's just JavaScript". The code compiles one-to-one 
into the equivalent JS, and there is no interpretation at runtime. You can use any existing 
JavaScript library seamlessly from CoffeeScript (and vice-versa). The compiled output is 
readable and pretty-printed, will work in every JavaScript runtime, and tends to run as fast 
or faster than the equivalent handwritten JavaScript. 

### haml [http://haml.info/](http://haml.info/)

Haml (HTML abstraction markup language) is based on one primary principle: 
markup should be beautiful. 
It’s not just beauty for beauty’s sake either; Haml accelerates and simplifies template 
creation down to veritable haiku.

Unspace Interactive and several other professional Rails shops use Haml exclusively for 
their projects, valuing its focus on cleanliness, readability, and production speed.

### sass [http://sass-lang.com/](http://sass-lang.com/)

Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.
Sass is an extension of CSS that adds power and elegance to the basic language. 
It allows you to use variables, nested rules, mixins, inline imports, and more, all with 
a fully CSS-compatible syntax. Sass helps keep large stylesheets well-organized, and get 
small stylesheets up and running quickly, particularly with the help of the Compass style library.

### spin [http://fgnass.github.io/spin.js/](http://fgnass.github.io/spin.js/)

Pure Javascript Highly configurable Loading Spinner 

### moment [http://momentjs.com/](http://momentjs.com/)

A javascript date library for parsing, validating, manipulating, and formatting dates. 


Blueprint
---------

Module
------

    mymodule
V    
