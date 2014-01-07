var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("PostsModule.List", function(List, App, Backbone, Marionette, $, _) {
  return List.Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function(options) {
      var posts,
        _this = this;
      posts = options.posts || (options.posts = App.request("post:entities"));
      App.execute("when:fetched", posts, function() {});
      this.layout = this.getLayoutView();
      this.listenTo(this.layout, "show", function() {
        _this.resultsView(posts);
        _this.postsView(posts);
        return _this.paginationView(posts);
      });
      return this.show(this.layout, {
        loading: {
          entities: posts
        }
      });
    };

    Controller.prototype.resultsView = function(posts) {
      var resultsView;
      resultsView = this.getResultsView(posts);
      resultsView.on("new:post:clicked", function(iv, posts) {
        return App.vent.trigger("new:post:clicked", posts);
      });
      return this.show(resultsView, {
        region: this.layout.resultsRegion
      });
    };

    Controller.prototype.postsView = function(posts) {
      var postsView;
      postsView = this.getPostsView(posts);
      postsView.on("childview:edit:post:clicked", function(iv, post) {
        return App.vent.trigger("edit:post:clicked", post);
      });
      postsView.on("childview:post:clicked", function(iv, post) {
        return App.vent.trigger("post:clicked", post);
      });
      postsView.on("childview:delete:post:clicked", function(iv, post) {
        return App.vent.trigger("delete:post:clicked", post);
      });
      return this.show(postsView, {
        region: this.layout.postsRegion
      });
    };

    Controller.prototype.paginationView = function(posts) {
      var paginationView;
      paginationView = this.getPaginationView(posts);
      return this.show(paginationView, {
        region: this.layout.paginationRegion
      });
    };

    Controller.prototype.getResultsView = function(posts) {
      return new List.Results({
        collection: posts
      });
    };

    Controller.prototype.getPaginationView = function(posts) {
      return new List.Pagination({
        collection: posts
      });
    };

    Controller.prototype.getPostsView = function(posts) {
      return new List.Posts({
        collection: posts
      });
    };

    Controller.prototype.getLayoutView = function() {
      return new List.Layout;
    };

    return Controller;

  })(App.Controllers.Base);
});
