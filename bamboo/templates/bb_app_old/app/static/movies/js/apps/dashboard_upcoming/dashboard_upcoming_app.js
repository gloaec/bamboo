this.BambooApp.module("DashboardUpcomingApp", function(DashboardUpcomingApp, App, Backbone, Marionette, $, _) {
  var API;
  API = {
    list: function(region) {
      return new DashboardUpcomingApp.List.Controller({
        region: region
      });
    }
  };
  return App.commands.setHandler("list:dashboard:upcoming:movies", function(region) {
    return API.list(region);
  });
});
