var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("EventsApp", function(EventsApp, App, Backbone, Marionette, $, _) {
  var API;
  this.startWithParent = false;
  EventsApp.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.appRoutes = {
      "events": "list"
    };

    return Router;

  })(Marionette.AppRouter);
  API = {
    list: function() {
      return EventsApp.List.Controller.list();
    },
    edit: function(event) {
      return EventsApp.Edit.Controller.edit(event);
    }
  };
  App.vent.on("edit:event:clicked", function(event) {
    return API.edit(event);
  });
  return App.addInitializer(function() {
    return new EventsApp.Router({
      controller: API
    });
  });
});
