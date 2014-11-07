var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  var API;
  Entities.Button = (function(_super) {

    __extends(Button, _super);

    function Button() {
      Button.__super__.constructor.apply(this, arguments);
    }

    return Button;

  })(Entities.Model);
  Entities.ButtonsCollection = (function(_super) {

    __extends(ButtonsCollection, _super);

    function ButtonsCollection() {
      ButtonsCollection.__super__.constructor.apply(this, arguments);
    }

    ButtonsCollection.prototype.model = Entities.Button;

    return ButtonsCollection;

  })(Entities.Collection);
  API = {
    getButtons: function() {
      return new Entities.FlashesCollection;
    }
  };
  return App.reqres.setHandler("button:entities", function() {
    return API.getButtons();
  });
});
