var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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
