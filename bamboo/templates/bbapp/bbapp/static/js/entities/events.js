var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  var API;
  Entities.Event = (function(_super) {

    __extends(Event, _super);

    function Event() {
      Event.__super__.constructor.apply(this, arguments);
    }

    return Event;

  })(Backbone.Model);
  Entities.EventsCollection = (function(_super) {

    __extends(EventsCollection, _super);

    function EventsCollection() {
      EventsCollection.__super__.constructor.apply(this, arguments);
    }

    EventsCollection.prototype.model = Entities.Event;

    return EventsCollection;

  })(Backbone.Collection);
  API = {
    getEvents: function() {
      return new Entities.EventsCollection([
        {
          id: 1,
          date: "03/14/2013",
          name: "Birthday",
          description: "Age is a high price to pay for maturity."
        }, {
          id: 2,
          date: "03/17/2013",
          name: "Screencasts",
          description: "Release new screencasts, and update the site."
        }, {
          id: 3,
          date: "03/27/2013",
          name: "Blog",
          description: "Finish writing epic blog post."
        }
      ]);
    }
  };
  return App.reqres.setHandler("event:entities", function() {
    return API.getEvents();
  });
});
