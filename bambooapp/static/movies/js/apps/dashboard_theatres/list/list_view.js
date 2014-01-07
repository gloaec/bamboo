var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("DashboardTheatresApp.List", function(List, App, Backbone, Marionette, $, _) {
  List.Theatre = (function(_super) {

    __extends(Theatre, _super);

    function Theatre() {
      Theatre.__super__.constructor.apply(this, arguments);
    }

    Theatre.prototype.template = "movies/dashboard_theatres/list/_theatre";

    Theatre.prototype.tagName = "tr";

    return Theatre;

  })(App.Views.ItemView);
  return List.Theatres = (function(_super) {

    __extends(Theatres, _super);

    function Theatres() {
      Theatres.__super__.constructor.apply(this, arguments);
    }

    Theatres.prototype.template = "movies/dashboard_theatres/list/theatres";

    Theatres.prototype.itemView = List.Theatre;

    Theatres.prototype.itemViewContainer = "tbody";

    return Theatres;

  })(App.Views.CompositeView);
});
