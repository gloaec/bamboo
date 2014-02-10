var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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
