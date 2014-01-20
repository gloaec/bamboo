var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

(function(Backbone, Marionette) {
  return Marionette.Region.Flashes = (function(_super) {

    __extends(Flashes, _super);

    function Flashes() {
      _.extend(this, Backbone.Events);
    }

    Flashes.prototype.onShow = function(view) {
      var options;
      this.setupBindings(view);
      return options = this.getDefaultOptions(_.result(view, "dialog"));
    };

    Flashes.prototype.getDefaultOptions = function(options) {
      if (options == null) options = {};
      return _.defaults(options, {
        backdrop: true,
        keyboard: true,
        show: true,
        remote: false
      });
    };

    Flashes.prototype.setupBindings = function(view) {
      return this.listenTo(view, "flashes:close", this.closeFlashes);
    };

    Flashes.prototype.closeFlashes = function() {
      this.$el.modal('hide');
      this.stopListening();
      this.close();
      return this.$el.empty();
    };

    return Flashes;

  })(Marionette.Region);
})(Backbone, Marionette);
