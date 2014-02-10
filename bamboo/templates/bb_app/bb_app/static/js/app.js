this.BambooApp = (function(Backbone, Marionette) {
  var App;
  App = new Marionette.Application;
  App.addRegions({
    headerRegion: "#header-region",
    mainRegion: "#main-region",
    footerRegion: "#footer-region",
    flashRegion: Marionette.Region.Flashes.extend({
      el: "#flash-region"
    }),
    dialogRegion: Marionette.Region.Dialog.extend({
      el: "#dialog-region"
    })
  });
  App.rootRoute = "dashboard";
  App.reqres.setHandler("default:region", function() {
    return App.mainRegion;
  });
  App.addInitializer(function() {
    App.module("HeaderApp").start();
    return App.module("FooterApp").start();
  });
  App.commands.setHandler("register:instance", function(instance, id) {
    return App.register(instance, id);
  });
  App.commands.setHandler("unregister:instance", function(instance, id) {
    return App.unregister(instance, id);
  });
  App.on("initialize:after", function(options) {
    this.startHistory();
    if (!this.getCurrentRoute()) {
      return this.navigate(this.rootRoute, {
        trigger: true
      });
    }
  });
  return App;
})(Backbone, Marionette);
