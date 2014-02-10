var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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
