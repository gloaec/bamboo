this.BambooApp.module("FooterApp", function(FooterApp, App, Backbone, Marionette, $, _) {
  var API;
  API = {
    show: function() {
      return new FooterApp.Show.Controller({
        region: App.footerRegion
      });
    }
  };
  return FooterApp.on("start", function() {
    return API.show();
  });
});
