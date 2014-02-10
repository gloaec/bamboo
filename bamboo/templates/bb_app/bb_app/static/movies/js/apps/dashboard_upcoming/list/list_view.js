var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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
