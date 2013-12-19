var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  var API;
  Entities.Post = (function(_super) {

    __extends(Post, _super);

    function Post() {
      Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.relations = {
      parent: Post,
      author: Entities.User
    };

    Post.prototype.defaults = {};

    Post.prototype.validation = {
      title: {
        required: true,
        pattern: /^[A-Z]/
      },
      content: {
        maxLength: 120,
        msg: 'Too long'
      }
    };

    Post.prototype.urlRoot = function() {
      return "/api/posts";
    };

    return Post;

  })(Entities.Model);
  Entities.PostsCollection = (function(_super) {

    __extends(PostsCollection, _super);

    function PostsCollection() {
      PostsCollection.__super__.constructor.apply(this, arguments);
    }

    PostsCollection.prototype.model = Entities.Post;

    PostsCollection.prototype.url = function() {
      return "/api/posts";
    };

    PostsCollection.prototype.comparator = function(m) {
      return -m.get("created_at");
    };

    PostsCollection.prototype.getByAuthorID = function(id) {
      return this.where({
        author_id: id
      });
    };

    return PostsCollection;

  })(Entities.Collection);
  API = {
    getPosts: function() {
      var posts;
      posts = new Entities.PostsCollection;
      posts.fetch({
        reset: true
      });
      return posts;
    },
    getPost: function(id) {
      var post;
      post = new Entities.Post({
        id: id
      });
      post.fetch();
      return post;
    }
  };
  App.reqres.setHandler("post:entities", function() {
    return API.getPosts();
  });
  return App.reqres.setHandler("post:entity", function(id) {
    return API.getPost(id);
  });
});
