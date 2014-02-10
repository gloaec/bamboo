var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("RentalsApp", function(RentalsApp, App, Backbone, Marionette, $, _) {
  var API;
  RentalsApp.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.appRoutes = {
      "rentals": "list"
    };

    return Router;

  })(Marionette.AppRouter);
  API = {
    list: function() {
      return new RentalsApp.List.Controller;
    }
  };
  return App.addInitializer(function() {
    return new RentalsApp.Router({
      controller: API
    });
  });
});
