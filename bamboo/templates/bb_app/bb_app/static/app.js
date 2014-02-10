var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

(function(Backbone) {
  var _sync;
  _sync = Backbone.sync;
  return Backbone.sync = function(method, entity, options) {
    var sync;
    if (options == null) options = {};
    sync = _sync(method, entity, options);
    if (!entity._fetch && method === "read") entity._fetch = sync;
    return sync;
  };
})(Backbone);

(function(Marionette) {
  return _.extend(Marionette.Renderer, {
    lookups: ["apps", "components", ""],
    render: function(template, data) {
      var path;
      if (template === false) return;
      path = this.getTemplate(template);
      if (!path) throw "Template " + template + " not found!";
      return path.call(data);
    },
    getTemplate: function(template) {
      var lookup, path, _i, _j, _len, _len2, _ref, _ref2;
      _ref = this.lookups;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        lookup = _ref[_i];
        _ref2 = [template, "js/" + lookup + template, this.withTemplate(lookup, template), this.withModuleTemplate(lookup, template)];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          path = _ref2[_j];
          if (JST[path]) return JST[path];
        }
      }
    },
    withTemplate: function(dir, string) {
      var array;
      array = string.split("/");
      array.splice(0, 0, "js/" + dir);
      array.splice(-1, 0, "templates");
      console.log(array.join("/"));
      return array.join("/");
    },
    withModuleTemplate: function(dir, string) {
      var array;
      array = string.split("/");
      array.splice(1, 0, "static/js/" + dir);
      array.splice(-1, 0, "templates");
      console.log(array.join("/"));
      return array.join("/");
    }
  });
})(Marionette);

(function(Backbone) {
  return _.extend(Backbone.Marionette.Application.prototype, {
    navigate: function(route, options) {
      if (options == null) options = {};
      return Backbone.history.navigate(route, options);
    },
    getCurrentRoute: function() {
      var frag;
      frag = Backbone.history.fragment;
      if (_.isEmpty(frag)) {
        return null;
      } else {
        return frag;
      }
    },
    startHistory: function(options) {
      if (options == null) options = {};
      _.defaults(options, {
        pushState: true
      });
      if (Backbone.history) {
        Backbone.history.start(options);
        if (Backbone.history._hasPushState) {
          return $(document).delegate("a[href^='/']", "click", this.delegateClick);
        }
      }
    },
    delegateClick: function(event) {
      var href, passThrough, protocol;
      event = event || window.event;
      href = $(this).attr("href");
      protocol = this.protocol + "//";
      passThrough = href.indexOf('special_url') >= 0 || ($(this).data('reload') != null);
      passThrough || (passThrough = href.slice(protocol.length) === protocol);
      passThrough || (passThrough = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
      if (!passThrough) {
        event.preventDefault();
        $('li.active').removeClass('active');
        $('a').each(function(i, el) {
          if (href.match($(el).attr('href'))) {
            return $(el).parent('li').addClass('active');
          }
        });
        Backbone.history.navigate(href, true);
        return false;
      }
    },
    register: function(instance, id) {
      if (this._registry == null) this._registry = {};
      return this._registry[id] = instance;
    },
    unregister: function(instance, id) {
      return delete this._registry[id];
    },
    resetRegistry: function() {
      var controller, key, msg, oldCount, _ref;
      oldCount = this.getRegistrySize();
      _ref = this._registry;
      for (key in _ref) {
        controller = _ref[key];
        controller.region.close();
      }
      msg = "There were " + oldCount + " controllers in the registry, there are now " + (this.getRegistrySize());
      if (this.getRegistrySize() > 0) {
        return console.warn(msg, this._registry);
      } else {
        return console.log(msg);
      }
    },
    getRegistrySize: function() {
      return _.size(this._registry);
    }
  });
})(Backbone);

(function(Backbone, Marionette) {
  return Marionette.Region.Dialog = (function(_super) {

    __extends(Dialog, _super);

    function Dialog() {
      _.extend(this, Backbone.Events);
    }

    Dialog.prototype.open = function(view) {
      return this.$el.empty().append($('<div>').addClass('modal-dialog').append($('<div>').addClass('modal-content').append(view.el)));
    };

    Dialog.prototype.onShow = function(view) {
      var options,
        _this = this;
      this.setupBindings(view);
      options = this.getDefaultOptions(_.result(view, "dialog"));
      this.$el.modal(options);
      return this.$el.on("hidden.bs.modal", function() {
        return _this.closeDialog();
      });
    };

    Dialog.prototype.getDefaultOptions = function(options) {
      if (options == null) options = {};
      return _.defaults(options, {
        backdrop: true,
        keyboard: true,
        show: true,
        remote: false
      });
    };

    Dialog.prototype.setupBindings = function(view) {
      this.listenTo(view, "dialog:close", this.closeDialog);
      return this.listenTo(view, "dialog:title", this.titleizeDialog);
    };

    Dialog.prototype.closeDialog = function() {
      this.$el.modal('hide');
      this.stopListening();
      this.close();
      return this.$el.empty();
    };

    Dialog.prototype.titleizeDialog = function(title) {
      return this.$('.modal-title').html(title);
    };

    return Dialog;

  })(Marionette.Region);
})(Backbone, Marionette);

this.BambooApp = (function(Backbone, Marionette) {
  var App;
  App = new Marionette.Application;
  App.addRegions({
    headerRegion: "#header-region",
    mainRegion: "#main-region",
    footerRegion: "#footer-region",
    dialogRegion: Marionette.Region.Dialog.extend({
      el: "#dialog-region"
    })
  });
  App.rootRoute = "dashboard";
  App.reqres.setHandler("default:region", function() {
    return App.mainRegion;
  });
  App.addInitializer(function() {
    App.module("HeaderApp").start();
    return App.module("FooterApp").start();
  });
  App.commands.setHandler("register:instance", function(instance, id) {
    return App.register(instance, id);
  });
  App.commands.setHandler("unregister:instance", function(instance, id) {
    return App.unregister(instance, id);
  });
  App.on("initialize:after", function(options) {
    this.startHistory();
    if (!this.getCurrentRoute()) {
      return this.navigate(this.rootRoute, {
        trigger: true
      });
    }
  });
  return App;
})(Backbone, Marionette);

this.BambooApp.module("Controllers", function(Controllers, App, Backbone, Marionette, $, _) {
  return Controllers.Base = (function(_super) {

    __extends(Base, _super);

    function Base(options) {
      if (options == null) options = {};
      this.region = options.region || App.request("default:region");
      this._instance_id = _.uniqueId("controller");
      App.execute("register:instance", this, this._instance_id);
      Base.__super__.constructor.apply(this, arguments);
    }

    Base.prototype.close = function() {
      App.execute("unregister:instance", this, this._instance_id);
      this._mainView = null;
      return Base.__super__.close.apply(this, arguments);
    };

    Base.prototype.show = function(view, options) {
      if (options == null) options = {};
      _.defaults(options, {
        loading: false,
        region: this.region
      });
      this._setMainView(view);
      return this._manageView(view, options);
    };

    Base.prototype._setMainView = function(view) {
      if (this._mainView) return;
      this._mainView = view;
      return this.listenTo(view, "close", this.close);
    };

    Base.prototype._manageView = function(view, options) {
      if (options.loading) {
        return App.execute("show:loading", view, options);
      } else {
        return options.region.show(view);
      }
    };

    return Base;

  })(Marionette.Controller);
});

this.BambooApp.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  return Entities.Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      Model.__super__.constructor.apply(this, arguments);
    }

    return Model;

  })(Backbone.Model);
});

this.BambooApp.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  return Entities.Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      Collection.__super__.constructor.apply(this, arguments);
    }

    return Collection;

  })(Backbone.Collection);
});

this.BambooApp.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  return App.commands.setHandler("when:fetched", function(entities, callback) {
    var xhrs;
    xhrs = _.chain([entities]).flatten().pluck("_fetch").value();
    return $.when.apply($, xhrs).done(function() {
      return callback();
    });
  });
});

this.BambooApp.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  var API;
  Entities.Movie = (function(_super) {

    __extends(Movie, _super);

    function Movie() {
      Movie.__super__.constructor.apply(this, arguments);
    }

    return Movie;

  })(Entities.Model);
  Entities.MoviesCollection = (function(_super) {

    __extends(MoviesCollection, _super);

    function MoviesCollection() {
      MoviesCollection.__super__.constructor.apply(this, arguments);
    }

    MoviesCollection.prototype.model = Entities.Movie;

    MoviesCollection.prototype.parse = function(resp) {
      return resp.movies;
    };

    return MoviesCollection;

  })(Entities.Collection);
  API = {
    getMovies: function(url, params) {
      var movies;
      if (params == null) params = {};
      _.defaults(params, {
        apikey: "vzjnwecqq7av3mauck2238uj",
        country: "us"
      });
      movies = new Entities.MoviesCollection;
      movies.url = "http://api.rottentomatoes.com/api/public/v1.0/" + url + ".json?callback=?";
      movies.fetch({
        reset: true,
        data: params
      });
      return movies;
    }
  };
  App.reqres.setHandler("movie:rental:entities", function() {
    return API.getMovies("lists/dvds/top_rentals", {
      limit: 20
    });
  });
  App.reqres.setHandler("search:movie:entities", function(searchTerm) {
    return API.getMovies("movies", {
      q: $.trim(searchTerm)
    });
  });
  App.reqres.setHandler("theatre:movie:entities", function() {
    return API.getMovies("lists/movies/in_theaters", {
      page_limit: 10,
      page: 1
    });
  });
  return App.reqres.setHandler("upcoming:movie:entities", function() {
    return API.getMovies("lists/movies/upcoming", {
      page_limit: 10,
      page: 1
    });
  });
});

this.BambooApp.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  var API;
  Entities.Event = (function(_super) {

    __extends(Event, _super);

    function Event() {
      Event.__super__.constructor.apply(this, arguments);
    }

    return Event;

  })(Backbone.Model);
  Entities.EventsCollection = (function(_super) {

    __extends(EventsCollection, _super);

    function EventsCollection() {
      EventsCollection.__super__.constructor.apply(this, arguments);
    }

    EventsCollection.prototype.model = Entities.Event;

    return EventsCollection;

  })(Backbone.Collection);
  API = {
    getEvents: function() {
      return new Entities.EventsCollection([
        {
          id: 1,
          date: "03/14/2013",
          name: "Birthday",
          description: "Age is a high price to pay for maturity."
        }, {
          id: 2,
          date: "03/17/2013",
          name: "Screencasts",
          description: "Release new screencasts, and update the site."
        }, {
          id: 3,
          date: "03/27/2013",
          name: "Blog",
          description: "Finish writing epic blog post."
        }
      ]);
    }
  };
  return App.reqres.setHandler("event:entities", function() {
    return API.getEvents();
  });
});

this.BambooApp.module("Views", function(Views, App, Backbone, Marionette, $, _) {
  return Views.CompositeView = (function(_super) {

    __extends(CompositeView, _super);

    function CompositeView() {
      CompositeView.__super__.constructor.apply(this, arguments);
    }

    CompositeView.prototype.itemViewEventPrefix = "childview";

    return CompositeView;

  })(Marionette.CompositeView);
});

this.BambooApp.module("Views", function(Views, App, Backbone, Marionette, $, _) {});

this.BambooApp.module("Views", function(Views, App, Backbone, Marionette, $, _) {
  return Views.Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.className = 'container';

    return Layout;

  })(Marionette.Layout);
});

this.BambooApp.module("Views", function(Views, App, Backbone, Marionette, $, _) {
  return _.extend(Marionette.View.prototype, {
    templateHelpers: function() {}
  });
});

this.BambooApp.module("Views", function(Views, App, Backbone, Marionette, $, _) {
  return Views.CollectionView = (function(_super) {

    __extends(CollectionView, _super);

    function CollectionView() {
      CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.itemViewEventPrefix = "childview";

    return CollectionView;

  })(Marionette.CollectionView);
});

this.BambooApp.module("Views", function(Views, App, Backbone, Marionette, $, _) {
  return Views.ItemView = (function(_super) {

    __extends(ItemView, _super);

    function ItemView() {
      ItemView.__super__.constructor.apply(this, arguments);
    }

    return ItemView;

  })(Marionette.ItemView);
});

this.BambooApp.module("Components.Loading", function(Loading, App, Backbone, Marionette, $, _) {
  Loading.LoadingController = (function(_super) {

    __extends(LoadingController, _super);

    function LoadingController() {
      LoadingController.__super__.constructor.apply(this, arguments);
    }

    LoadingController.prototype.initialize = function(options) {
      var config, loadingView, view;
      view = options.view, config = options.config;
      config = _.isBoolean(config) ? {} : config;
      _.defaults(config, {
        loadingType: "spinner",
        entities: this.getEntities(view),
        debug: false
      });
      switch (config.loadingType) {
        case "opacity":
          this.region.currentView.$el.css("opacity", 0.5);
          break;
        case "spinner":
          loadingView = this.getLoadingView();
          this.show(loadingView);
          break;
        default:
          throw new Error("Invalid loadingType");
      }
      return this.showRealView(view, loadingView, config);
    };

    LoadingController.prototype.showRealView = function(realView, loadingView, config) {
      var _this = this;
      return App.execute("when:fetched", config.entities, function() {
        switch (config.loadingType) {
          case "opacity":
            _this.region.currentView.$el.removeAttr("style");
            break;
          case "spinner":
            if (_this.region.currentView !== loadingView) return realView.close();
        }
        if (!config.debug) return _this.show(realView);
      });
    };

    LoadingController.prototype.getEntities = function(view) {
      return _.chain(view).pick("model", "collection").toArray().compact().value();
    };

    LoadingController.prototype.getLoadingView = function() {
      return new Loading.LoadingView;
    };

    return LoadingController;

  })(App.Controllers.Base);
  return App.commands.setHandler("show:loading", function(view, options) {
    return new Loading.LoadingController({
      view: view,
      region: options.region,
      config: options.loading
    });
  });
});

this.BambooApp.module("Components.Loading", function(Loading, App, Backbone, Marionette, $, _) {
  return Loading.LoadingView = (function(_super) {

    __extends(LoadingView, _super);

    function LoadingView() {
      LoadingView.__super__.constructor.apply(this, arguments);
    }

    LoadingView.prototype.template = false;

    LoadingView.prototype.className = "loading-container";

    LoadingView.prototype.onShow = function() {
      var opts;
      opts = this._getOptions();
      return this.$el.spin(opts);
    };

    LoadingView.prototype.onClose = function() {
      return this.$el.spin(false);
    };

    LoadingView.prototype._getOptions = function() {
      return {
        lines: 10,
        length: 6,
        width: 2.5,
        radius: 7,
        corners: 1,
        rotate: 9,
        direction: 1,
        color: '#000',
        speed: 1,
        trail: 60,
        shadow: false,
        hwaccel: true,
        className: 'spinner',
        zIndex: 2e9,
        top: 'auto',
        left: 'auto'
      };
    };

    return LoadingView;

  })(App.Views.ItemView);
});

this.BambooApp.module("DocsCommandsApp", function(DocsCommandsApp, App, Backbone, Marionette, $, _) {
  var API;
  API = {
    list: function(region) {
      return new DocsCommandsApp.List.Controller({
        region: region
      });
    }
  };
  return App.commands.setHandler("list:docs:commands", function(region) {
    return API.list(region);
  });
});

this.BambooApp.module("EventsApp", function(EventsApp, App, Backbone, Marionette, $, _) {
  var API;
  this.startWithParent = false;
  EventsApp.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.appRoutes = {
      "events": "list"
    };

    return Router;

  })(Marionette.AppRouter);
  API = {
    list: function() {
      return EventsApp.List.Controller.list();
    },
    edit: function(event) {
      return EventsApp.Edit.Controller.edit(event);
    }
  };
  App.vent.on("edit:event:clicked", function(event) {
    return API.edit(event);
  });
  return App.addInitializer(function() {
    return new EventsApp.Router({
      controller: API
    });
  });
});

this.BambooApp.module("HeaderApp", function(HeaderApp, App, Backbone, Marionette, $, _) {
  var API;
  API = {
    list: function() {
      return new HeaderApp.List.Controller({
        region: App.headerRegion
      });
    }
  };
  return HeaderApp.on("start", function() {
    return API.list();
  });
});

this.BambooApp.module("DocsApp", function(DocsApp, App, Backbone, Marionette, $, _) {
  var API;
  DocsApp.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.prefix = 'docs';

    Router.prototype.appRoutes = {
      "*": "showGetStarted",
      "commands": "listCommands"
    };

    return Router;

  })(Marionette.SubRouter);
  API = {
    showGetStarted: function() {
      var _ref;
      if (!((_ref = this.controller) != null ? _ref._mainView : void 0)) {
        this.controller = new DocsApp.Show.Controller;
      }
      return this.controller.showGetStarted();
    },
    listCommands: function() {
      var _ref;
      if (!((_ref = this.controller) != null ? _ref._mainView : void 0)) {
        this.controller = new DocsApp.Show.Controller;
      }
      return this.controller.listCommands();
    }
  };
  return App.addInitializer(function() {
    return new DocsApp.Router({
      controller: API
    });
  });
});

this.BambooApp.module("FooterApp", function(FooterApp, App, Backbone, Marionette, $, _) {
  var API;
  API = {
    show: function() {
      return new FooterApp.Show.Controller({
        region: App.footerRegion
      });
    }
  };
  return FooterApp.on("start", function() {
    return API.show();
  });
});

this.BambooApp.module("DocsCommandsApp.List", function(List, App, Backbone, Marionette, $, _) {
  return List.Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function() {
      var commands, commandsView;
      console.log('test');
      commands = new Backbone.Collection([]);
      commandsView = this.getCommandsView(commands);
      return this.show(commandsView, {
        loading: true
      });
    };

    Controller.prototype.getCommandsView = function(commands) {
      return new List.Commands({
        collection: commands
      });
    };

    return Controller;

  })(App.Controllers.Base);
});

this.BambooApp.module("DocsCommandsApp.List", function(List, App, Backbone, Marionette, $, _) {
  List.Command = (function(_super) {

    __extends(Command, _super);

    function Command() {
      Command.__super__.constructor.apply(this, arguments);
    }

    Command.prototype.template = "docs_commands/list/_command";

    Command.prototype.tagName = "tr";

    return Command;

  })(App.Views.ItemView);
  return List.Commands = (function(_super) {

    __extends(Commands, _super);

    function Commands() {
      Commands.__super__.constructor.apply(this, arguments);
    }

    Commands.prototype.template = "docs_commands/list/commands";

    Commands.prototype.itemView = List.Command;

    Commands.prototype.itemViewContainer = "tbody";

    Commands.prototype.onRender = function() {
      var $sideBar;
      $sideBar = this.$('.bb-sidebar');
      $(document.body).scrollspy({
        target: '.bb-sidebar',
        offet: $('.navbar').outerHeight(true) + 10
      });
      return $sideBar.affix({
        offset: {
          top: function() {
            var navOuterHeight, offsetTop, sideBarMargin;
            offsetTop = $sideBar.offset().top;
            sideBarMargin = parseInt($sideBar.children(0).css('margin-top'), 10);
            navOuterHeight = $('.bb-navbar').height();
            return this.top = offsetTop - navOuterHeight - sideBarMargin;
          },
          bottom: function() {
            return this.bottom = $('.bb-footer').outerHeight(true);
          }
        }
      });
    };

    return Commands;

  })(App.Views.CompositeView);
});

this.BambooApp.module("EventsApp.List", function(List, App, Backbone, Marionette, $, _) {
  return List.Controller = {
    list: function() {
      var events, listView;
      events = App.request("event:entities");
      listView = this.getListView(events);
      listView.on("itemview:edit:event:clicked", function(iv, event) {
        return App.vent.trigger("edit:event:clicked", event);
      });
      return App.mainRegion.show(listView);
    },
    getListView: function(events) {
      return new List.Events({
        collection: events
      });
    }
  };
});

this.BambooApp.module("EventsApp.List", function(List, App, Backbone, Marionette, $, _) {
  List.Event = (function(_super) {

    __extends(Event, _super);

    function Event() {
      Event.__super__.constructor.apply(this, arguments);
    }

    Event.prototype.tagName = "tr";

    Event.prototype.template = "events/list/templates/_event";

    Event.prototype.events = {
      "click button": function() {
        return this.trigger("edit:event:clicked", this.model);
      }
    };

    return Event;

  })(Marionette.ItemView);
  return List.Events = (function(_super) {

    __extends(Events, _super);

    function Events() {
      Events.__super__.constructor.apply(this, arguments);
    }

    Events.prototype.className = 'container';

    Events.prototype.template = "events/list/templates/events";

    Events.prototype.itemView = List.Event;

    Events.prototype.itemViewContainer = "tbody";

    return Events;

  })(Marionette.CompositeView);
});

this.BambooApp.module("EventsApp.Edit", function(Edit, App, Backbone, Marionette, $, _) {
  return Edit.Event = (function(_super) {

    __extends(Event, _super);

    function Event() {
      Event.__super__.constructor.apply(this, arguments);
    }

    Event.prototype.template = "events/edit/templates/edit_event";

    Event.prototype.modelEvents = {
      "change:name": function() {
        return console.log("name changed");
      }
    };

    Event.prototype.events = {
      "click #close-dialog": function() {
        return this.trigger("dialog:close");
      }
    };

    Event.prototype.dialog = {
      title: "Edit Event",
      className: "dialogClass",
      buttons: false
    };

    Event.prototype.onClose = function() {
      return console.log("view closing");
    };

    Event.prototype.onDialogButtonClicked = function() {
      return console.log("dialog method onDialogButtonClicked");
    };

    return Event;

  })(Marionette.ItemView);
});

this.BambooApp.module("EventsApp.Edit", function(Edit, App, Backbone, Marionette, $, _) {
  return Edit.Controller = {
    edit: function(event) {
      var editView;
      window.event = event;
      editView = this.getEditView(event);
      window.editView = editView;
      editView.on("dialog:button:clicked", function() {
        return console.log("editView instance dialog:button:clicked");
      });
      return App.dialogRegion.show(editView);
    },
    getEditView: function(event) {
      return new Edit.Event({
        model: event
      });
    }
  };
});

this.BambooApp.module("HeaderApp.List", function(List, App, Backbone, Marionette, $, _) {
  return List.Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function() {
      this.layout = this.getLayoutView();
      return this.show(this.layout);
    };

    Controller.prototype.getLayoutView = function() {
      return new List.Layout;
    };

    return Controller;

  })(App.Controllers.Base);
});

this.BambooApp.module("HeaderApp.List", function(List, App, Backbone, Marionette, $, _) {
  return List.Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.template = "header/list/list_layout";

    Layout.prototype.events = {
      'click .dropdown-menu a': function(e) {
        return $(e.target).parents('ul.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
      }
    };

    Layout.prototype.regions = {
      fooRegion: "#foo-region"
    };

    return Layout;

  })(App.Views.Layout);
});

this.BambooApp.module("DocsApp.Show", function(Show, App, Backbone, Marionette, $, _) {
  Show.Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.template = "docs/show/show_layout";

    Layout.prototype.regions = {
      tabsRegion: "#tabs-region",
      contentsRegion: "#contents-region"
    };

    return Layout;

  })(App.Views.Layout);
  Show.Tabs = (function(_super) {

    __extends(Tabs, _super);

    function Tabs() {
      Tabs.__super__.constructor.apply(this, arguments);
    }

    Tabs.prototype.template = "docs/show/_tabs";

    Tabs.prototype.events = {
      "click a": "tabClicked"
    };

    return Tabs;

  })(App.Views.ItemView);
  ({
    tabClicked: function(e) {
      e.preventDefault();
      return this.trigger("tab:clicked", e.target);
    }
  });
  return Show.Hero = (function(_super) {

    __extends(Hero, _super);

    function Hero() {
      Hero.__super__.constructor.apply(this, arguments);
    }

    Hero.prototype.template = "docs/show/_hero";

    return Hero;

  })(App.Views.ItemView);
});

this.BambooApp.module("DocsApp.Show", function(Show, App, Backbone, Marionette, $, _) {
  return Show.Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function() {
      var _this = this;
      this.layout = this.getLayoutView();
      return this.listenTo(this.layout, "show", function() {
        return _this.tabsView();
      });
    };

    Controller.prototype.listCommands = function() {
      if (!this._mainView) this.show(this.layout);
      return App.execute("list:docs:commands", this.layout.contentsRegion);
    };

    Controller.prototype.showGetStarted = function() {
      if (!this._mainView) this.show(this.layout);
      return App.execute("show:docs:getstarted", this.layout.contentsRegion);
    };

    Controller.prototype.tabsView = function() {
      var tabsView,
        _this = this;
      tabsView = this.getTabsView();
      this.listenTo(tabsView, "tab:clicked", function(tab) {
        return console.log('tab clicked', tab);
      });
      return this.show(tabsView, {
        region: this.layout.tabsRegion
      });
    };

    Controller.prototype.getTabsView = function() {
      return new Show.Tabs;
    };

    Controller.prototype.getLayoutView = function() {
      return new Show.Layout;
    };

    return Controller;

  })(App.Controllers.Base);
});

this.BambooApp.module("FooterApp.Show", function(Show, App, Backbone, Marionette, $, _) {
  return Show.Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.template = "footer/show/show_layout";

    Layout.prototype.regions = {
      fooRegion: "#foo-region"
    };

    return Layout;

  })(App.Views.Layout);
});

this.BambooApp.module("FooterApp.Show", function(Show, App, Backbone, Marionette, $, _) {
  return Show.Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function() {
      this.layout = this.getLayoutView();
      return this.show(this.layout);
    };

    Controller.prototype.getLayoutView = function() {
      return new Show.Layout;
    };

    return Controller;

  })(App.Controllers.Base);
});

this.BambooApp.module("DashboardTheatresApp", function(DashboardTheatresApp, App, Backbone, Marionette, $, _) {
  var API;
  API = {
    list: function(region) {
      return new DashboardTheatresApp.List.Controller({
        region: region
      });
    }
  };
  return App.commands.setHandler("list:dashboard:theatre:movies", function(region) {
    return API.list(region);
  });
});

this.BambooApp.module("DashboardApp", function(DashboardApp, App, Backbone, Marionette, $, _) {
  var API;
  DashboardApp.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.appRoutes = {
      "dashboard": "show"
    };

    return Router;

  })(Marionette.AppRouter);
  API = {
    show: function() {
      return new DashboardApp.Show.Controller;
    }
  };
  return App.addInitializer(function() {
    return new DashboardApp.Router({
      controller: API
    });
  });
});

this.BambooApp.module("DashboardUpcomingApp", function(DashboardUpcomingApp, App, Backbone, Marionette, $, _) {
  var API;
  API = {
    list: function(region) {
      return new DashboardUpcomingApp.List.Controller({
        region: region
      });
    }
  };
  return App.commands.setHandler("list:dashboard:upcoming:movies", function(region) {
    return API.list(region);
  });
});

this.BambooApp.module("RentalsApp", function(RentalsApp, App, Backbone, Marionette, $, _) {
  var API;
  RentalsApp.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.appRoutes = {
      "rentals": "list"
    };

    return Router;

  })(Marionette.AppRouter);
  API = {
    list: function() {
      return new RentalsApp.List.Controller;
    }
  };
  return App.addInitializer(function() {
    return new RentalsApp.Router({
      controller: API
    });
  });
});

this.BambooApp.module("SearchApp", function(SearchApp, App, Backbone, Marionette, $, _) {
  var API;
  SearchApp.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.appRoutes = {
      "search": "list"
    };

    return Router;

  })(Marionette.AppRouter);
  API = {
    list: function() {
      return new SearchApp.List.Controller;
    }
  };
  return App.addInitializer(function() {
    return new SearchApp.Router({
      controller: API
    });
  });
});

this.BambooApp.module("DashboardTheatresApp.List", function(List, App, Backbone, Marionette, $, _) {
  return List.Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function() {
      var theatreView, theatres;
      theatres = App.request("theatre:movie:entities");
      theatreView = this.getTheatreView(theatres);
      return this.show(theatreView, {
        loading: true
      });
    };

    Controller.prototype.getTheatreView = function(theatres) {
      return new List.Theatres({
        collection: theatres
      });
    };

    return Controller;

  })(App.Controllers.Base);
});

this.BambooApp.module("DashboardTheatresApp.List", function(List, App, Backbone, Marionette, $, _) {
  List.Theatre = (function(_super) {

    __extends(Theatre, _super);

    function Theatre() {
      Theatre.__super__.constructor.apply(this, arguments);
    }

    Theatre.prototype.template = "movies/dashboard_theatres/list/_theatre";

    Theatre.prototype.tagName = "tr";

    return Theatre;

  })(App.Views.ItemView);
  return List.Theatres = (function(_super) {

    __extends(Theatres, _super);

    function Theatres() {
      Theatres.__super__.constructor.apply(this, arguments);
    }

    Theatres.prototype.template = "movies/dashboard_theatres/list/theatres";

    Theatres.prototype.itemView = List.Theatre;

    Theatres.prototype.itemViewContainer = "tbody";

    return Theatres;

  })(App.Views.CompositeView);
});

this.BambooApp.module("DashboardApp.Show", function(Show, App, Backbone, Marionette, $, _) {
  return Show.Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.template = "movies/dashboard/show/show_layout";

    Layout.prototype.regions = {
      upcomingRegion: "#upcoming-region",
      theatreRegion: "#theatre-region"
    };

    return Layout;

  })(App.Views.Layout);
});

this.BambooApp.module("DashboardApp.Show", function(Show, App, Backbone, Marionette, $, _) {
  return Show.Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function() {
      var _this = this;
      this.layout = this.getLayoutView();
      this.listenTo(this.layout, "show", function() {
        _this.listUpcoming();
        return _this.listTheatre();
      });
      return this.show(this.layout);
    };

    Controller.prototype.listUpcoming = function() {
      return App.execute("list:dashboard:upcoming:movies", this.layout.upcomingRegion);
    };

    Controller.prototype.listTheatre = function() {
      return App.execute("list:dashboard:theatre:movies", this.layout.theatreRegion);
    };

    Controller.prototype.getLayoutView = function() {
      return new Show.Layout;
    };

    return Controller;

  })(App.Controllers.Base);
});

this.BambooApp.module("DashboardUpcomingApp.List", function(List, App, Backbone, Marionette, $, _) {
  return List.Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function() {
      var upcoming, upcomingView;
      upcoming = App.request("upcoming:movie:entities");
      upcomingView = this.getUpcomingView(upcoming);
      return this.show(upcomingView, {
        loading: true
      });
    };

    Controller.prototype.getUpcomingView = function(upcoming) {
      return new List.UpcomingMovies({
        collection: upcoming
      });
    };

    return Controller;

  })(App.Controllers.Base);
});

this.BambooApp.module("DashboardUpcomingApp.List", function(List, App, Backbone, Marionette, $, _) {
  List.UpcomingMovie = (function(_super) {

    __extends(UpcomingMovie, _super);

    function UpcomingMovie() {
      UpcomingMovie.__super__.constructor.apply(this, arguments);
    }

    UpcomingMovie.prototype.template = "movies/dashboard_upcoming/list/_upcoming_movie";

    UpcomingMovie.prototype.tagName = "tr";

    return UpcomingMovie;

  })(App.Views.ItemView);
  return List.UpcomingMovies = (function(_super) {

    __extends(UpcomingMovies, _super);

    function UpcomingMovies() {
      UpcomingMovies.__super__.constructor.apply(this, arguments);
    }

    UpcomingMovies.prototype.template = "movies/dashboard_upcoming/list/upcoming_movies";

    UpcomingMovies.prototype.itemView = List.UpcomingMovie;

    UpcomingMovies.prototype.itemViewContainer = "tbody";

    return UpcomingMovies;

  })(App.Views.CompositeView);
});

this.BambooApp.module("RentalsApp.List", function(List, App, Backbone, Marionette, $, _) {
  return List.Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function() {
      var rentals,
        _this = this;
      rentals = App.request("movie:rental:entities");
      App.execute("when:fetched", rentals, function() {
        return rentals.reset(rentals.sortBy("runtime"));
      });
      this.layout = this.getLayoutView();
      this.listenTo(this.layout, "show", function() {
        _this.resultsView(rentals);
        _this.rentalsView(rentals);
        return _this.paginationView(rentals);
      });
      return this.show(this.layout, {
        loading: {
          entities: rentals
        }
      });
    };

    Controller.prototype.resultsView = function(rentals) {
      var resultsView;
      resultsView = this.getResultsView(rentals);
      return this.show(resultsView, {
        region: this.layout.resultsRegion
      });
    };

    Controller.prototype.rentalsView = function(rentals) {
      var rentalsView;
      rentalsView = this.getMoviesView(rentals);
      return this.show(rentalsView, {
        region: this.layout.rentalsRegion
      });
    };

    Controller.prototype.paginationView = function(rentals) {
      var paginationView;
      paginationView = this.getPaginationView(rentals);
      return this.show(paginationView, {
        region: this.layout.paginationRegion
      });
    };

    Controller.prototype.getResultsView = function(rentals) {
      return new List.Results({
        collection: rentals
      });
    };

    Controller.prototype.getPaginationView = function(rentals) {
      return new List.Pagination({
        collection: rentals
      });
    };

    Controller.prototype.getMoviesView = function(rentals) {
      return new List.Rentals({
        collection: rentals
      });
    };

    Controller.prototype.getLayoutView = function() {
      return new List.Layout;
    };

    return Controller;

  })(App.Controllers.Base);
});

this.BambooApp.module("RentalsApp.List", function(List, App, Backbone, Marionette, $, _) {
  List.Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.template = "movies/rentals/list/list_layout";

    Layout.prototype.regions = {
      resultsRegion: "#results-region",
      rentalsRegion: "#rentals-region",
      paginationRegion: "#pagination-region"
    };

    return Layout;

  })(App.Views.Layout);
  List.Rental = (function(_super) {

    __extends(Rental, _super);

    function Rental() {
      Rental.__super__.constructor.apply(this, arguments);
    }

    Rental.prototype.template = "movies/rentals/list/_rental";

    Rental.prototype.tagName = "tr";

    return Rental;

  })(App.Views.ItemView);
  List.Rentals = (function(_super) {

    __extends(Rentals, _super);

    function Rentals() {
      Rentals.__super__.constructor.apply(this, arguments);
    }

    Rentals.prototype.template = "movies/rentals/list/_rentals";

    Rentals.prototype.itemView = List.Rental;

    Rentals.prototype.itemViewContainer = "tbody";

    return Rentals;

  })(App.Views.CompositeView);
  List.Results = (function(_super) {

    __extends(Results, _super);

    function Results() {
      Results.__super__.constructor.apply(this, arguments);
    }

    Results.prototype.template = "movies/rentals/list/_results";

    return Results;

  })(App.Views.ItemView);
  return List.Pagination = (function(_super) {

    __extends(Pagination, _super);

    function Pagination() {
      Pagination.__super__.constructor.apply(this, arguments);
    }

    Pagination.prototype.template = "movies/rentals/list/_pagination";

    return Pagination;

  })(App.Views.ItemView);
});

this.BambooApp.module("SearchApp.List", function(List, App, Backbone, Marionette, $, _) {
  return List.Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function() {
      var _this = this;
      this.layout = this.getLayoutView();
      this.listenTo(this.layout, "show", function() {
        _this.panelView();
        return _this.moviesView();
      });
      return this.show(this.layout);
    };

    Controller.prototype.panelView = function() {
      var panelView,
        _this = this;
      panelView = this.getPanelView();
      this.listenTo(panelView, "search:submitted", function(searchTerm) {
        return _this.moviesView(searchTerm);
      });
      return this.show(panelView, {
        region: this.layout.panelRegion
      });
    };

    Controller.prototype.moviesView = function(searchTerm) {
      if (searchTerm == null) searchTerm = null;
      if (searchTerm) {
        return this.searchView(searchTerm);
      } else {
        return this.showHeroView();
      }
    };

    Controller.prototype.searchView = function(searchTerm) {
      var movies, moviesView, opts;
      movies = App.request("search:movie:entities", searchTerm);
      moviesView = this.getMoviesView(movies);
      opts = {
        region: this.layout.moviesRegion,
        loading: true
      };
      if (this.layout.moviesRegion.currentView !== this.heroView) {
        opts.loading = {
          loadingType: "opacity"
        };
      }
      return this.show(moviesView, opts);
    };

    Controller.prototype.showHeroView = function() {
      this.heroView = this.getHeroView();
      return this.show(this.heroView, {
        region: this.layout.moviesRegion
      });
    };

    Controller.prototype.getHeroView = function() {
      return new List.Hero;
    };

    Controller.prototype.getMoviesView = function(movies) {
      return new List.Movies({
        collection: movies
      });
    };

    Controller.prototype.getPanelView = function() {
      return new List.Panel;
    };

    Controller.prototype.getLayoutView = function() {
      return new List.Layout;
    };

    return Controller;

  })(App.Controllers.Base);
});

this.BambooApp.module("SearchApp.List", function(List, App, Backbone, Marionette, $, _) {
  List.Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.template = "movies/search/list/list_layout";

    Layout.prototype.regions = {
      panelRegion: "#panel-region",
      moviesRegion: "#movies-region"
    };

    return Layout;

  })(App.Views.Layout);
  List.Panel = (function(_super) {

    __extends(Panel, _super);

    function Panel() {
      Panel.__super__.constructor.apply(this, arguments);
    }

    Panel.prototype.template = "movies/search/list/_panel";

    Panel.prototype.ui = {
      "input": "input"
    };

    Panel.prototype.events = {
      "submit form": "formSubmitted"
    };

    Panel.prototype.formSubmitted = function(e) {
      var val;
      e.preventDefault();
      val = $.trim(this.ui.input.val());
      return this.trigger("search:submitted", val);
    };

    return Panel;

  })(App.Views.ItemView);
  List.Movie = (function(_super) {

    __extends(Movie, _super);

    function Movie() {
      Movie.__super__.constructor.apply(this, arguments);
    }

    Movie.prototype.template = "movies/search/list/_movie";

    Movie.prototype.tagName = "tr";

    return Movie;

  })(App.Views.ItemView);
  List.Empty = (function(_super) {

    __extends(Empty, _super);

    function Empty() {
      Empty.__super__.constructor.apply(this, arguments);
    }

    Empty.prototype.template = "movies/search/list/_empty";

    Empty.prototype.tagName = "tr";

    return Empty;

  })(App.Views.ItemView);
  List.Movies = (function(_super) {

    __extends(Movies, _super);

    function Movies() {
      Movies.__super__.constructor.apply(this, arguments);
    }

    Movies.prototype.template = "movies/search/list/_movies";

    Movies.prototype.itemView = List.Movie;

    Movies.prototype.emptyView = List.Empty;

    Movies.prototype.itemViewContainer = "tbody";

    return Movies;

  })(App.Views.CompositeView);
  return List.Hero = (function(_super) {

    __extends(Hero, _super);

    function Hero() {
      Hero.__super__.constructor.apply(this, arguments);
    }

    Hero.prototype.template = "movies/search/list/_hero";

    return Hero;

  })(App.Views.ItemView);
});
