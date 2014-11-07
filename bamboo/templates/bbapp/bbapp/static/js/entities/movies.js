var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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
