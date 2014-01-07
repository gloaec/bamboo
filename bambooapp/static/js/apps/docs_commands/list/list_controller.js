var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("DocsCommandsApp.List", function(List, App, Backbone, Marionette, $, _) {
  return List.Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function() {
      var commands, commandsView;
      commands = new Backbone.Collection([]);
      commandsView = this.getCommandsView(commands);
      return this.show(commandsView, {
        loading: true
      });
    };

    Controller.prototype.getCommandsView = function(commands) {
      return new List.Commands({
        collection: commands
      });
    };

    return Controller;

  })(App.Controllers.Base);
});
