var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("EventsApp.Edit", function(Edit, App, Backbone, Marionette, $, _) {
  return Edit.Event = (function(_super) {

    __extends(Event, _super);

    function Event() {
      Event.__super__.constructor.apply(this, arguments);
    }

    Event.prototype.template = "events/edit/templates/edit_event";

    Event.prototype.modelEvents = {
      "change:name": function() {
        return console.log("name changed");
      }
    };

    Event.prototype.events = {
      "click #close-dialog": function() {
        return this.trigger("dialog:close");
      }
    };

    Event.prototype.dialog = {
      title: "Edit Event",
      className: "dialogClass",
      buttons: false
    };

    Event.prototype.onClose = function() {
      return console.log("view closing");
    };

    Event.prototype.onDialogButtonClicked = function() {
      return console.log("dialog method onDialogButtonClicked");
    };

    return Event;

  })(Marionette.ItemView);
});
