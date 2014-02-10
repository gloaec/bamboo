var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("PostsModule.New", function(New, App, Backbone, Marionette, $, _) {
  return New.Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function(options) {
      var post, posts,
        _this = this;
      posts = options.posts || (options.posts = App.request("post:entities"));
      post = new posts.model();
      this.newView = this.getNewView(post, posts);
      this.listenTo(this.newView, "form:submitted", function() {});
      return this.show(this.newView);
    };

    Controller.prototype.getNewView = function(post, posts) {
      return new New.Post({
        model: post,
        collection: posts
      });
    };

    return Controller;

  })(App.Controllers.Base);
});
