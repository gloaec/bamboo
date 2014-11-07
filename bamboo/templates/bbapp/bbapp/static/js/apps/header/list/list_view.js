var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("HeaderApp.List", function(List, App, Backbone, Marionette, $, _) {
  return List.Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.template = "header/list/list_layout";

    Layout.prototype.events = {
      'click .dropdown-menu a': function(e) {
        return $(e.target).parents('ul.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
      }
    };

    Layout.prototype.regions = {
      fooRegion: "#foo-region"
    };

    return Layout;

  })(App.Views.Layout);
});
