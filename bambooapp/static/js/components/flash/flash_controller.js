var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("Components.Flash", function(Flash, App, Backbone, Marionette, $, _) {
  Flash.FlashController = (function(_super) {

    __extends(FlashController, _super);

    function FlashController() {
      FlashController.__super__.constructor.apply(this, arguments);
    }

    FlashController.prototype.initialize = function(options) {
      this.flashes = options.flashes || (options.flashes = App.request("flash:entities"));
      return this.region = options.region || (options.region = App.flashRegion);
    };

    FlashController.prototype.add = function(options) {
      var className, message;
      _.defaults(options, {
        message: "Hello World",
        className: "alert-info"
      });
      message = options.message, className = options.className;
      className = "alert alert-dismissable " + className;
      return this.flashes.add({
        message: message,
        className: className
      });
    };

    FlashController.prototype.showMessages = function() {
      var flashesView;
      flashesView = this.getFlashesView(this.flashes);
      this.show(flashesView);
      flashesView.stopListening();
      return this.flashes.reset();
    };

    FlashController.prototype.getFlashesView = function(flashes) {
      return new Flash.FlashesView({
        collection: flashes
      });
    };

    return FlashController;

  })(App.Controllers.Base);
  App.addInitializer(function() {
    return this.flashController = new Flash.FlashController;
  });
  Backbone.history.on('navigate', function() {
    return App.flashController.showMessages();
  });
  App.commands.setHandler("flash:info", function(message) {
    return App.flashController.add({
      message: message,
      className: 'alert-info'
    });
  });
  App.commands.setHandler("flash:error", function(message) {
    return App.flashController.add({
      message: message,
      className: 'alert-danger'
    });
  });
  App.commands.setHandler("flash:warning", function(message) {
    return App.flashController.add({
      message: message,
      className: 'alert-warning'
    });
  });
  return App.commands.setHandler("flash:success", function(message) {
    return App.flashController.add({
      message: message,
      className: 'alert-success'
    });
  });
});
