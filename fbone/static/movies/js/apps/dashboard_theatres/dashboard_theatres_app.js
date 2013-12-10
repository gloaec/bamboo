this.BambooApp.module("DashboardTheatresApp", function(DashboardTheatresApp, App, Backbone, Marionette, $, _) {
  var API;
  API = {
    list: function(region) {
      return new DashboardTheatresApp.List.Controller({
        region: region
      });
    }
  };
  return App.commands.setHandler("list:dashboard:theatre:movies", function(region) {
    return API.list(region);
  });
});
