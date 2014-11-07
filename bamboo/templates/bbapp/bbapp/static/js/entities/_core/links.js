var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  var API;
  Entities.Link = (function(_super) {

    __extends(Link, _super);

    function Link() {
      Link.__super__.constructor.apply(this, arguments);
    }

    return Link;

  })(Entities.Model);
  Entities.LinksCollection = (function(_super) {

    __extends(LinksCollection, _super);

    function LinksCollection() {
      LinksCollection.__super__.constructor.apply(this, arguments);
    }

    LinksCollection.prototype.model = Entities.Link;

    return LinksCollection;

  })(Entities.Collection);
  API = {
    getLinks: function() {
      return new Entities.FlashesCollection;
    }
  };
  return App.reqres.setHandler("link:entities", function() {
    return API.getLinks();
  });
});
