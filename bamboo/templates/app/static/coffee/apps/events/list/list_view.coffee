@BambooApp.module "EventsApp.List", (List, App, Backbone, Marionette, $, _) ->
	
  class List.Event extends Marionette.ItemView
    tagName: "tr"
    template: "events/list/_event"
    events:
      "click button" : -> @trigger "edit:event:clicked", @model
	
  class List.Events extends Marionette.CompositeView
    className:'container'
    template: "events/list/events"
    itemView: List.Event
    itemViewContainer: "tbody"
