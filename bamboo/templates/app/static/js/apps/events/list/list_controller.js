this.BambooApp.module("EventsApp.List", function(List, App, Backbone, Marionette, $, _) {
  return List.Controller = {
    list: function() {
      var events, listView;
      events = App.request("event:entities");
      listView = this.getListView(events);
      listView.on("itemview:edit:event:clicked", function(iv, event) {
        return App.vent.trigger("edit:event:clicked", event);
      });
      return App.mainRegion.show(listView);
    },
    getListView: function(events) {
      return new List.Events({
        collection: events
      });
    }
  };
});
