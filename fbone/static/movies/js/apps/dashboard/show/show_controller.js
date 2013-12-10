var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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
