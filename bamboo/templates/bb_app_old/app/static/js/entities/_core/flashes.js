var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  var API;
  Entities.Flash = (function(_super) {

    __extends(Flash, _super);

    function Flash() {
      Flash.__super__.constructor.apply(this, arguments);
    }

    return Flash;

  })(Entities.Model);
  Entities.FlashesCollection = (function(_super) {

    __extends(FlashesCollection, _super);

    function FlashesCollection() {
      FlashesCollection.__super__.constructor.apply(this, arguments);
    }

    FlashesCollection.prototype.model = Entities.Flash;

    return FlashesCollection;

  })(Entities.Collection);
  API = {
    getFlashes: function() {
      return new Entities.FlashesCollection;
    }
  };
  return App.reqres.setHandler("flash:entities", function() {
    return API.getFlashes();
  });
});
