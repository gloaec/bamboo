this.BambooApp.module("Views", function(Views, App, Backbone, Marionette, $, _) {
  return _.extend(Marionette.View.prototype, {
    templateHelpers: function() {}
  });
});
