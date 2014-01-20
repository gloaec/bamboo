var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  var API;
  Entities.Author = (function(_super) {

    __extends(Author, _super);

    function Author() {
      Author.__super__.constructor.apply(this, arguments);
    }

    Author.mixin(Entities.User);

    Author.prototype.relations = [
      {
        type: Backbone.Many,
        key: 'posts',
        relatedModel: 'BambooApp.Entities.Post'
      }
    ];

    Author.prototype.defaults = {
      posts: []
    };

    return Author;

  })(Entities.Model);
  Entities.Post = (function(_super) {

    __extends(Post, _super);

    function Post() {
      Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.urlRoot = function() {
      return "/api/posts";
    };

    Post.prototype.relations = [
      {
        type: Backbone.One,
        key: 'author',
        relatedModel: 'BambooApp.Entities.User'
      }
    ];

    Post.prototype.defaults = {
      author: null
    };

    Post.prototype.validation = {
      title: [
        {
          required: true,
          msg: 'Title is required'
        }, {
          pattern: /^[A-Z]/,
          msg: 'Must start with capital letter'
        }
      ],
      content: {
        maxLength: 140,
        msg: 'Post is too long (140 chars maximum)'
      }
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
