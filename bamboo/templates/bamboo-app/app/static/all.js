var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

window.App = new Backbone.Marionette.Application;

App.module('Models');

App.module('Collections');

App.module('Views');

App.module('Controllers');

App.module('Routers');

App.redirectHashBang = function() {
  return window.location = window.location.hash.substring(2);
};

App.addInitializer(function() {
  this.addRegions({
    mainRegion: '#main-content'
  });
  this.router = new this.Routers.Main({
    controller: new this.Controllers.Main
  });
  this.mainRegion.onShow = function(view) {
    var flash, _i, _len, _ref;
    _ref = App.flashes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      flash = _ref[_i];
      flash.slideDown().alert();
      console.log('flash', this.$el, flash);
      view.$el.prepend(flash);
    }
    return App.flashes = [];
  };
  return $(document).on('click', "a[href^='/']", function(e) {
    var href, passThrough, url;
    href = $(this).attr('href');
    passThrough = href.indexOf('special_url') >= 0 || ($(this).data('reload') != null);
    if (!passThrough && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      url = href.replace(/^\//, '').replace('\#\!\/', '');
      App.router.navigate(url, {
        trigger: true
      });
      $('ul.nav > li').removeClass('active').find('a').each(function() {
        var link;
        link = $(this).attr('href');
        if ((new RegExp(link)).test(href) && link !== '/' || (href === link && link === '/')) {
          return $(this).parent('li').addClass('active');
        }
      });
      return false;
    }
  });
});

App.on('initialize:after', function() {
  if (Backbone.history != null) {
    return Backbone.history.start({
      pushState: true
    });
  }
});

$(function() {
  console.log('App Start...', App);
  if (window.location.hash.indexOf('!') > -1) {
    return App.redirectHashBang();
  } else {
    return App.start();
  }
});

App.flashes = [];

App.flash = function(msg, type, icon) {
  if (type == null) type = 'info';
  if (icon == null) icon = null;
  return App.flashes.push($(JST['core/alert'].call({
    "class": "alert-" + type + " fade in",
    text: msg,
    icon: (function() {
      if (icon != null) {
        return icon;
      } else {
        switch (type) {
          case 'info':
            return 'icon-info';
          case 'warning':
            return 'icon-warning';
          case 'error':
            return 'icon-remove';
          case 'success':
            return 'icon-ok';
          default:
            return 'icon-info';
        }
      }
    })()
  })));
};

String.prototype.trunc = String.prototype.truncate;

_.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

_.extend(Backbone.View.prototype, {
  validateit: function() {
    return Backbone.Validation.bind(this);
  },
  showErrors: function(errors) {
    var attr_name, msg, selector, _results,
      _this = this;
    this.$('.help-block').text('');
    this.$('.has-error').removeClass('has-error');
    if (errors != null) {
      _results = [];
      for (attr_name in errors) {
        msg = errors[attr_name];
        if (Array.isArray(msg)) msg = msg.first();
        selector = Object.keys(this.bindings).find(function(selector) {
          return _this.bindings[selector] === attr_name;
        });
        if (selector != null) {
          this.$(selector).parent().addClass('has-error');
          _results.push(this.$(selector).next('.help-block').text(msg));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  }
});

Backbone.Marionette.Renderer.render = function(template, data) {
  if (JST[template] == null) throw "Template '" + template + "' not found!";
  return JST[template].call(data);
};

_.extend(Backbone.Marionette.View.prototype, {
  remove: function() {
    return this.$el.slideUp('slow', function() {
      return $(this).remove();
    });
  }
});

_.extend(Backbone.Marionette.Region.prototype, {
  show: function(view) {
    this.ensureEl();
    view.render();
    return this.close(function() {
      if (this.currentView && this.currentView !== view) return;
      this.currentView = view;
      return this.open(view, function() {
        if (view.onShow) view.onShow();
        view.trigger("show");
        if (this.onShow) this.onShow(view);
        return this.trigger("view:show", view);
      });
    });
  },
  close: function(cb) {
    var view,
      _this = this;
    view = this.currentView;
    delete this.currentView;
    if (!view) {
      if (cb) cb.call(this);
      return;
    }
    return view.$el.fadeOut("fast", function() {
      if (view.close) view.close();
      _this.trigger("view:closed", view);
      if (cb) return cb.call(_this);
    });
  },
  open: function(view, callback) {
    var _this = this;
    this.$el.html(view.$el.hide());
    return view.$el.fadeIn("fast", function() {
      $('[data-spy="scroll"]').each(function() {
        return $(this).scrollspy('refresh');
      });
      return callback.call(_this);
    });
  }
});

App.addInitializer(function() {
  return this.folders = new App.Collections.Folders;
});

App.flashes = [];

App.flash = function(msg, type, icon) {
  if (type == null) type = 'info';
  if (icon == null) icon = null;
  return App.flashes.push($(JST['core/alert'].call({
    "class": "alert-" + type + " fade in",
    text: msg,
    icon: (function() {
      if (icon != null) {
        return icon;
      } else {
        switch (type) {
          case 'info':
            return 'icon-info';
          case 'warning':
            return 'icon-warning';
          case 'error':
            return 'icon-remove';
          case 'success':
            return 'icon-ok';
          default:
            return 'icon-info';
        }
      }
    })()
  })));
};

String.prototype.trunc = String.prototype.truncate;

_.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

_.extend(Backbone.View.prototype, {
  validateit: function() {
    return Backbone.Validation.bind(this);
  },
  showErrors: function(errors) {
    var attr_name, msg, selector, _results,
      _this = this;
    this.$('.help-block').text('');
    this.$('.has-error').removeClass('has-error');
    if (errors != null) {
      _results = [];
      for (attr_name in errors) {
        msg = errors[attr_name];
        if (Array.isArray(msg)) msg = msg.first();
        selector = Object.keys(this.bindings).find(function(selector) {
          return _this.bindings[selector] === attr_name;
        });
        if (selector != null) {
          this.$(selector).parent().addClass('has-error');
          _results.push(this.$(selector).next('.help-block').text(msg));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  }
});

Backbone.Marionette.Renderer.render = function(template, data) {
  if (JST[template] == null) throw "Template '" + template + "' not found!";
  return JST[template].call(data);
};

_.extend(Backbone.Marionette.View.prototype, {
  remove: function() {
    return this.$el.slideUp('slow', function() {
      return $(this).remove();
    });
  }
});

_.extend(Backbone.Marionette.Region.prototype, {
  show: function(view) {
    this.ensureEl();
    view.render();
    return this.close(function() {
      if (this.currentView && this.currentView !== view) return;
      this.currentView = view;
      return this.open(view, function() {
        if (view.onShow) view.onShow();
        view.trigger("show");
        if (this.onShow) this.onShow(view);
        return this.trigger("view:show", view);
      });
    });
  },
  close: function(cb) {
    var view,
      _this = this;
    view = this.currentView;
    delete this.currentView;
    if (!view) {
      if (cb) cb.call(this);
      return;
    }
    return view.$el.fadeOut("fast", function() {
      if (view.close) view.close();
      _this.trigger("view:closed", view);
      if (cb) return cb.call(_this);
    });
  },
  open: function(view, callback) {
    var _this = this;
    this.$el.html(view.$el.hide());
    return view.$el.fadeIn("fast", function() {
      $('[data-spy="scroll"]').each(function() {
        return $(this).scrollspy('refresh');
      });
      return callback.call(_this);
    });
  }
});

App.addInitializer(function() {
  return this.folders = new App.Collections.Folders;
});

App.module('Views').Commands = (function(_super) {

  __extends(Commands, _super);

  function Commands() {
    Commands.__super__.constructor.apply(this, arguments);
  }

  Commands.prototype.template = 'commands';

  Commands.prototype.onRender = function() {
    var $sideBar;
    $sideBar = this.$('.bb-sidebar');
    return this.$("[role='complementary']").affix({
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

})(Backbone.Marionette.Layout);

App.module('Views').Home = (function(_super) {

  __extends(Home, _super);

  function Home() {
    Home.__super__.constructor.apply(this, arguments);
  }

  Home.prototype.template = 'home';

  Home.prototype.initialize = function() {
    return console.log('home');
  };

  return Home;

})(Backbone.Marionette.Layout);

App.module('Views').Loading = (function(_super) {

  __extends(Loading, _super);

  function Loading() {
    Loading.__super__.constructor.apply(this, arguments);
  }

  Loading.prototype.className = 'loading';

  Loading.prototype.template = 'loading';

  return Loading;

})(Backbone.Marionette.Layout);

App.Routers.Folders = (function(_super) {

  __extends(Folders, _super);

  function Folders() {
    Folders.__super__.constructor.apply(this, arguments);
  }

  Folders.prototype.prefix = 'folders';

  Folders.prototype.appRoutes = {
    '': 'index',
    'new': 'new',
    ':id': 'show',
    ':id/edit': 'edit'
  };

  return Folders;

})(Backbone.Marionette.SubRouter);

App.Controllers.Folders = (function() {

  function Folders(route) {
    if (/folders/.test(route)) App.folders.fetch();
  }

  Folders.prototype.showView = function(view) {
    return App.mainRegion.show(view);
  };

  Folders.prototype.index = function() {
    return this.showView(new App.Views.Folders.Index({
      collection: App.folders
    }));
  };

  Folders.prototype.show = function(id) {
    return this.showView(new App.Views.Folders.Show({
      model: App.folders.get(id)
    }));
  };

  Folders.prototype["new"] = function() {
    return this.showView(new App.Views.Folders.New({
      collection: App.folders
    }));
  };

  Folders.prototype.edit = function(id) {
    return this.showView(new App.Views.Folders.Edit({
      model: App.folders.get(id)
    }));
  };

  return Folders;

})();

App.Models.Folder = (function(_super) {

  __extends(Folder, _super);

  function Folder() {
    Folder.__super__.constructor.apply(this, arguments);
  }

  Folder.prototype.urlRoot = '/api/folders/';

  Folder.prototype.paramRoot = 'folder';

  Folder.prototype.defaults = {
    name: '',
    description: ''
  };

  Folder.prototype.validation = {
    name: {
      required: true
    }
  };

  return Folder;

})(Backbone.Model);

App.Collections.Folders = (function(_super) {

  __extends(Folders, _super);

  function Folders() {
    Folders.__super__.constructor.apply(this, arguments);
  }

  Folders.prototype.model = App.Models.Folder;

  Folders.prototype.url = '/api/folders';

  Folders.prototype.by_name = function(name) {
    return new App.Collections.Folders(this.where({
      name: name
    }, this.options));
  };

  return Folders;

})(Backbone.Collection);

App.module('Views.Folders').Edit = (function(_super) {

  __extends(Edit, _super);

  function Edit() {
    Edit.__super__.constructor.apply(this, arguments);
  }

  Edit.prototype.className = 'row';

  Edit.prototype.template = 'folders/edit';

  Edit.prototype.events = {
    "submit #edit-post": "update"
  };

  Edit.prototype.bindings = {
    '#name': 'name',
    '#description': 'description'
  };

  Edit.prototype.initialize = function() {
    var _this = this;
    return this.listenTo(this.model, 'validated', function(_, __, attrs) {
      return _this.showErrors(attrs);
    });
  };

  Edit.prototype.onRender = function() {
    this.stickit();
    return this.validateit();
  };

  Edit.prototype.update = function(e) {
    var _this = this;
    e.preventDefault();
    return this.model.save(null, {
      success: function() {
        App.flash("\"" + (_this.model.get('name')) + "\" successfully updated", 'success');
        return App.router.navigate("/folders", {
          trigger: true
        });
      },
      error: function(post, jqXHR) {
        return _this.showErrors($.parseJSON(jqXHR.responseText).errors);
      }
    });
  };

  return Edit;

})(Backbone.Marionette.ItemView);

App.module('Views.Folders').New = (function(_super) {

  __extends(New, _super);

  function New() {
    New.__super__.constructor.apply(this, arguments);
  }

  New.prototype.className = 'row';

  New.prototype.template = 'folders/new';

  New.prototype.events = {
    "submit form": "save"
  };

  New.prototype.bindings = {
    '#name': 'name',
    '#description': 'description'
  };

  New.prototype.initialize = function(options) {
    var _this = this;
    this.model = new this.collection.model();
    console.log('model', this.model);
    return this.listenTo(this.model, 'validated', function(_, __, attrs) {
      return _this.showErrors(attrs);
    });
  };

  New.prototype.onRender = function() {
    this.stickit();
    return this.validateit();
  };

  New.prototype.save = function(e) {
    var _this = this;
    e.preventDefault();
    if (this.model.isValid(true)) {
      return this.model.save(null, {
        success: function() {
          _this.collection.add(_this.model);
          App.flash("\"" + (_this.model.get('name')) + "\" successfully created", 'success');
          return App.router.navigate("/folders/" + _this.model.id, {
            trigger: true
          });
        },
        error: function(post, jqXHR) {
          return _this.showErrors($.parseJSON(jqXHR.responseText).errors);
        }
      });
    }
  };

  return New;

})(Backbone.Marionette.ItemView);

App.module('Views.Folders').Index = (function(_super) {

  __extends(Index, _super);

  function Index() {
    Index.__super__.constructor.apply(this, arguments);
  }

  Index.prototype.template = 'folders/index';

  Index.prototype.emptyView = App.Views.Loading;

  Index.prototype.itemViewContainer = 'tbody.folders';

  Index.prototype.initialize = function() {
    return this.itemView = App.Views.Folders.Folder;
  };

  return Index;

})(Backbone.Marionette.CompositeView);

App.module('Views.Folders').Show = (function(_super) {

  __extends(Show, _super);

  function Show() {
    Show.__super__.constructor.apply(this, arguments);
  }

  Show.prototype.className = 'row';

  Show.prototype.template = 'folders/show';

  Show.prototype.bindings = {
    '#name': 'name',
    '#description': 'description'
  };

  Show.prototype.onRender = function() {
    return this.stickit();
  };

  return Show;

})(Backbone.Marionette.ItemView);

App.module('Views.Folders').Folder = (function(_super) {

  __extends(Folder, _super);

  function Folder() {
    Folder.__super__.constructor.apply(this, arguments);
  }

  Folder.prototype.tagName = "tr";

  Folder.prototype.template = 'folders/folder';

  Folder.prototype.events = {
    "click .destroy": "destroy"
  };

  Folder.prototype.bindings = {
    '#name': 'name',
    '#description': 'description'
  };

  Folder.prototype.destroy = function(e) {
    e.preventDefault();
    return this.model.destroy();
  };

  Folder.prototype.onRender = function() {
    return this.stickit();
  };

  return Folder;

})(Backbone.Marionette.ItemView);

App.Routers.Main = (function(_super) {

  __extends(Main, _super);

  function Main() {
    Main.__super__.constructor.apply(this, arguments);
  }

  Main.prototype.appRoutes = {
    '': 'root',
    'back': 'back',
    'commands': 'commands',
    '*other': 'other'
  };

  return Main;

})(Backbone.Marionette.AppRouter);

App.Controllers.Main = (function() {

  function Main() {}

  Main.prototype.showView = function(view) {
    return App.mainRegion.show(view);
  };

  Main.prototype.root = function() {
    return this.showView(new App.Views.Home);
  };

  Main.prototype.back = function() {
    window.history.back();
    return window.history.back();
  };

  Main.prototype.commands = function() {
    return this.showView(new App.Views.Commands);
  };

  Main.prototype.other = function(route) {
    return new App.Routers.Folders({
      controller: new App.Controllers.Folders(route)
    });
  };

  return Main;

})();
