var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("PostsModule.New", function(New, App, Backbone, Marionette, $, _) {
  return New.Post = (function(_super) {

    __extends(Post, _super);

    function Post() {
      Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.template = "posts/new/new_post";

    Post.prototype.className = "container";

    Post.prototype.initialize = function() {
      var _this = this;
      return this.listenTo(this.model, 'validated', function(_, __, attrs) {
        return _this.showErrors(attrs);
      });
    };

    Post.prototype.ui = {
      "title": "#title",
      "content": "#content"
    };

    Post.prototype.events = {
      'submit form': 'formSubmitted'
    };

    Post.prototype.bindings = {
      "#title": "title",
      "#content": "content"
    };

    Post.prototype.onRender = function() {
      this.stickit();
      return this.validateit();
    };

    Post.prototype.formSubmitted = function(e) {
      var _this = this;
      e.preventDefault();
      if (this.model.isValid(true)) {
        return this.model.save(null, {
          success: function() {
            _this.collection.add(_this.model);
            App.execute("flash:success", "Post #" + _this.model.id + " successfully created");
            return App.navigate("posts", {
              trigger: true
            });
          },
          error: function(post, jqXHR) {
            return _this.showErrors($.parseJSON(jqXHR.responseText).errors);
          }
        });
      }
    };

    return Post;

  })(App.Views.ItemView);
});
