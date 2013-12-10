var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("Components.Loading", function(Loading, App, Backbone, Marionette, $, _) {
  return Loading.LoadingView = (function(_super) {

    __extends(LoadingView, _super);

    function LoadingView() {
      LoadingView.__super__.constructor.apply(this, arguments);
    }

    LoadingView.prototype.template = false;

    LoadingView.prototype.className = "loading-container";

    LoadingView.prototype.onShow = function() {
      var opts;
      opts = this._getOptions();
      return this.$el.spin(opts);
    };

    LoadingView.prototype.onClose = function() {
      return this.$el.spin(false);
    };

    LoadingView.prototype._getOptions = function() {
      return {
        lines: 10,
        length: 6,
        width: 2.5,
        radius: 7,
        corners: 1,
        rotate: 9,
        direction: 1,
        color: '#000',
        speed: 1,
        trail: 60,
        shadow: false,
        hwaccel: true,
        className: 'spinner',
        zIndex: 2e9,
        top: 'auto',
        left: 'auto'
      };
    };

    return LoadingView;

  })(App.Views.ItemView);
});
