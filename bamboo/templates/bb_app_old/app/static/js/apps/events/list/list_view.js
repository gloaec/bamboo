var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("EventsApp.List", function(List, App, Backbone, Marionette, $, _) {
  List.Event = (function(_super) {

    __extends(Event, _super);

    function Event() {
      Event.__super__.constructor.apply(this, arguments);
    }

    Event.prototype.tagName = "tr";

    Event.prototype.template = "events/list/_event";

    Event.prototype.events = {
      "click button": function() {
        return this.trigger("edit:event:clicked", this.model);
      }
    };

    return Event;

  })(Marionette.ItemView);
  return List.Events = (function(_super) {

    __extends(Events, _super);

    function Events() {
      Events.__super__.constructor.apply(this, arguments);
    }

    Events.prototype.className = 'container';

    Events.prototype.template = "events/list/events";

    Events.prototype.itemView = List.Event;

    Events.prototype.itemViewContainer = "tbody";

    return Events;

  })(Marionette.CompositeView);
});
