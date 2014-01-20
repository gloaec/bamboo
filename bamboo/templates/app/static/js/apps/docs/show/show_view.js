var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("DocsApp.Show", function(Show, App, Backbone, Marionette, $, _) {
  Show.Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.template = "docs/show/show_layout";

    Layout.prototype.regions = {
      tabsRegion: "#tabs-region",
      contentsRegion: "#contents-region"
    };

    return Layout;

  })(App.Views.Layout);
  Show.Tabs = (function(_super) {

    __extends(Tabs, _super);

    function Tabs() {
      Tabs.__super__.constructor.apply(this, arguments);
    }

    Tabs.prototype.template = "docs/show/_tabs";

    Tabs.prototype.events = {
      "click a": "tabClicked"
    };

    return Tabs;

  })(App.Views.ItemView);
  ({
    tabClicked: function(e) {
      e.preventDefault();
      return this.trigger("tab:clicked", e.target);
    }
  });
  return Show.Hero = (function(_super) {

    __extends(Hero, _super);

    function Hero() {
      Hero.__super__.constructor.apply(this, arguments);
    }

    Hero.prototype.template = "docs/show/_hero";

    return Hero;

  })(App.Views.ItemView);
});
