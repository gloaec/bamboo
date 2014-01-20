var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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
