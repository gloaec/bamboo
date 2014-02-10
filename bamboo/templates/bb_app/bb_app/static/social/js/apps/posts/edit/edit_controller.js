var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("PostsModule.Edit", function(Edit, App, Backbone, Marionette, $, _) {
  return Edit.Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function(options) {
      var post;
      post = options.post || (options.post = App.request("post:entity", options.id));
      this.editView = this.getEditView(post);
      this.editView.on("dialog:button:clicked", function() {
        return console.log("editView instance dialog:button:clicked");
      });
      return App.dialogRegion.show(this.editView);
    };

    Controller.prototype.getEditView = function(post) {
      return new Edit.Post({
        model: post
      });
    };

    return Controller;

  })(App.Controllers.Base);
});
