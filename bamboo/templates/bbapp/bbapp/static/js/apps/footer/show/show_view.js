var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("FooterApp.Show", function(Show, App, Backbone, Marionette, $, _) {
  return Show.Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.template = "footer/show/show_layout";

    Layout.prototype.regions = {
      fooRegion: "#foo-region"
    };

    return Layout;

  })(App.Views.Layout);
});
