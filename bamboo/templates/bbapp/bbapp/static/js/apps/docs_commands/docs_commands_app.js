this.BambooApp.module("DocsCommandsApp", function(DocsCommandsApp, App, Backbone, Marionette, $, _) {
  var API;
  API = {
    list: function(region) {
      return new DocsCommandsApp.List.Controller({
        region: region
      });
    }
  };
  return App.commands.setHandler("list:docs:commands", function(region) {
    return API.list(region);
  });
});
