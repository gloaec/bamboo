var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("PostsModule.Show", function(Show, App, Backbone, Marionette, $, _) {
  return Show.Post = (function(_super) {

    __extends(Post, _super);

    function Post() {
      Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.template = "posts/show/show_view";

    Post.prototype.className = "container";

    Post.prototype.bindings = {
      '#title': 'title',
      '#content': 'content'
    };

    Post.prototype.onRender = function() {
      return this.stickit();
    };

    return Post;

  })(App.Views.ItemView);
});
