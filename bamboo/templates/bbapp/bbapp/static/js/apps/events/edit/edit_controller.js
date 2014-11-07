this.BambooApp.module("EventsApp.Edit", function(Edit, App, Backbone, Marionette, $, _) {
  return Edit.Controller = {
    edit: function(event) {
      var editView;
      window.event = event;
      editView = this.getEditView(event);
      window.editView = editView;
      editView.on("dialog:button:clicked", function() {
        return console.log("editView instance dialog:button:clicked");
      });
      return App.dialogRegion.show(editView);
    },
    getEditView: function(event) {
      return new Edit.Event({
        model: event
      });
    }
  };
});
