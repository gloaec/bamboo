var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("Components.Flash", function(Flash, App, Backbone, Marionette, $, _) {
  Flash.FlashView = (function(_super) {

    __extends(FlashView, _super);

    function FlashView() {
      FlashView.__super__.constructor.apply(this, arguments);
    }

    FlashView.prototype.template = "components/flash/flash_view";

    FlashView.prototype.attributes = function() {
      return {
        "class": this.model.get('className')
      };
    };

    FlashView.prototype.events = {
      'click .close': function() {
        return this.close();
      }
    };

    FlashView.prototype.onClose = function() {
      return this.model.destroy();
    };

    return FlashView;

  })(App.Views.ItemView);
  return Flash.FlashesView = (function(_super) {

    __extends(FlashesView, _super);

    function FlashesView() {
      FlashesView.__super__.constructor.apply(this, arguments);
    }

    FlashesView.prototype.itemView = Flash.FlashView;

    FlashesView.prototype.className = "container";

    return FlashesView;

  })(App.Views.CollectionView);
});
