var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("PostsModule", function(PostsModule, App, Backbone, Marionette, $, _) {
  var API;
  PostsModule.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.prefix = "posts";

    Router.prototype.appRoutes = {
      "": "list",
      "new": "new",
      ":id": "show",
      ":id/edit": "edit"
    };

    return Router;

  })(Marionette.SubRouter);
  API = {
    list: function(posts) {
      if (posts == null) posts = false;
      return new PostsModule.List.Controller({
        posts: posts
      });
    },
    "new": function(posts) {
      if (posts == null) posts = false;
      return new PostsModule.New.Controller({
        posts: posts
      });
    },
    show: function(id, post) {
      if (post == null) post = false;
      return new PostsModule.Show.Controller({
        id: id,
        post: post
      });
    },
    edit: function(id, post) {
      if (post == null) post = false;
      return new PostsModule.Edit.Controller({
        id: id,
        post: post
      });
    },
    "delete": function(id, post) {
      if (post == null) post = false;
      return post.destroy();
    }
  };
  App.vent.on("posts:clicked", function(posts) {
    App.navigate("posts");
    return API.list(posts);
  });
  App.vent.on("post:clicked", function(post) {
    App.navigate("posts/" + post.id);
    return API.show(post.id, post);
  });
  App.vent.on("new:post:clicked", function(posts) {
    App.navigate("posts/new");
    return API["new"](posts);
  });
  App.vent.on("edit:post:clicked", function(post) {
    App.navigate("posts/" + post.id + "/edit");
    return API.edit(post.id, post);
  });
  App.vent.on("delete:post:clicked", function(post) {
    App.navigate("posts/" + post.id + "/delete");
    return API["delete"](post.id, post);
  });
  return App.addInitializer(function() {
    return new PostsModule.Router({
      controller: API
    });
  });
});
