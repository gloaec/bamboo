this.BambooApp.module("HeaderApp", function(HeaderApp, App, Backbone, Marionette, $, _) {
  var API;
  API = {
    list: function() {
      return new HeaderApp.List.Controller({
        region: App.headerRegion
      });
    }
  };
  return HeaderApp.on("start", function() {
    return API.list();
  });
});
