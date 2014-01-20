var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("PostsModule.Show", function(Show, App, Backbone, Marionette) {
  return Show.Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function(options) {
      var post;
      post = options.post || (options.post = App.request("post:entity", options.id));
      this.showView = this.getShowView(post);
      return this.show(this.showView, {
        loading: {
          entities: post
        }
      });
    };

    Controller.prototype.getShowView = function(post) {
      return new Show.Post({
        model: post
      });
    };

    return Controller;

  })(App.Controllers.Base);
});
