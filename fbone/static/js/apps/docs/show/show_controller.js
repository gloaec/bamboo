var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("DocsApp.Show", function(Show, App, Backbone, Marionette, $, _) {
  return Show.Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function() {
      var _this = this;
      this.layout = this.getLayoutView();
      return this.listenTo(this.layout, "show", function() {
        return _this.tabsView();
      });
    };

    Controller.prototype.listCommands = function() {
      if (!this._mainView) this.show(this.layout);
      return App.execute("list:docs:commands", this.layout.contentsRegion);
    };

    Controller.prototype.showGetStarted = function() {
      if (!this._mainView) this.show(this.layout);
      return App.execute("show:docs:getstarted", this.layout.contentsRegion);
    };

    Controller.prototype.tabsView = function() {
      var tabsView,
        _this = this;
      tabsView = this.getTabsView();
      this.listenTo(tabsView, "tab:clicked", function(tab) {
        return console.log('tab clicked', tab);
      });
      return this.show(tabsView, {
        region: this.layout.tabsRegion
      });
    };

    Controller.prototype.getTabsView = function() {
      return new Show.Tabs;
    };

    Controller.prototype.getLayoutView = function() {
      return new Show.Layout;
    };

    return Controller;

  })(App.Controllers.Base);
});
