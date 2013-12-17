var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("PostsModule.List", function(List, App, Backbone, Marionette, $, _) {
  List.Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.template = "posts/list/list_layout";

    Layout.prototype.regions = {
      resultsRegion: "#results-region",
      postsRegion: "#posts-region",
      paginationRegion: "#pagination-region"
    };

    return Layout;

  })(App.Views.Layout);
  List.Post = (function(_super) {

    __extends(Post, _super);

    function Post() {
      Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.template = "posts/list/_post";

    Post.prototype.bindings = {
      '.title': 'title',
      '.content': 'content'
    };

    Post.prototype.events = {
      "click .edit": function() {
        return this.trigger("edit:post:clicked", this.model);
      },
      "click .delete": function() {
        return this.trigger("delete:post:clicked", this.model);
      },
      "click .title": function() {
        return this.trigger("post:clicked", this.model);
      }
    };

    Post.prototype.onRender = function() {
      return this.stickit();
    };

    return Post;

  })(App.Views.ItemView);
  List.Posts = (function(_super) {

    __extends(Posts, _super);

    function Posts() {
      Posts.__super__.constructor.apply(this, arguments);
    }

    Posts.prototype.template = "posts/list/_posts";

    Posts.prototype.itemView = List.Post;

    Posts.prototype.itemViewContainer = "#posts";

    return Posts;

  })(App.Views.CompositeView);
  List.Results = (function(_super) {

    __extends(Results, _super);

    function Results() {
      Results.__super__.constructor.apply(this, arguments);
    }

    Results.prototype.template = "posts/list/_results";

    Results.prototype.events = {
      "click .new": function() {
        return this.trigger("new:post:clicked", this.collection);
      }
    };

    return Results;

  })(App.Views.ItemView);
  return List.Pagination = (function(_super) {

    __extends(Pagination, _super);

    function Pagination() {
      Pagination.__super__.constructor.apply(this, arguments);
    }

    Pagination.prototype.template = "posts/list/_pagination";

    return Pagination;

  })(App.Views.ItemView);
});
