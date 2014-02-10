var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("DocsApp", function(DocsApp, App, Backbone, Marionette, $, _) {
  var API;
  DocsApp.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.prefix = 'docs';

    Router.prototype.appRoutes = {
      "*": "showGetStarted",
      "commands": "listCommands"
    };

    return Router;

  })(Marionette.SubRouter);
  API = {
    showGetStarted: function() {
      var _ref;
      if (!((_ref = this.controller) != null ? _ref._mainView : void 0)) {
        this.controller = new DocsApp.Show.Controller;
      }
      return this.controller.showGetStarted();
    },
    listCommands: function() {
      var _ref;
      if (!((_ref = this.controller) != null ? _ref._mainView : void 0)) {
        this.controller = new DocsApp.Show.Controller;
      }
      return this.controller.listCommands();
    }
  };
  return App.addInitializer(function() {
    return new DocsApp.Router({
      controller: API
    });
  });
});
