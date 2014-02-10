var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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
