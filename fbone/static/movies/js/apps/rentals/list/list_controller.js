var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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
