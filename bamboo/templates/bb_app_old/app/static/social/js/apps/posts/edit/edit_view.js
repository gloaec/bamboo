var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("PostsModule.Edit", function(Edit, App, Backbone, Marionette, $, _) {
  return Edit.Post = (function(_super) {

    __extends(Post, _super);

    function Post() {
      Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.template = "posts/edit/templates/edit_post";

    Post.prototype.bindings = {
      "#title": "title",
      "#content": "content"
    };

    Post.prototype.events = {
      "submit form": "formSubmitted",
      "click .close": function() {
        return this.trigger("dialog:close");
      }
    };

    Post.prototype.modelEvents = {
      "change:title": function() {
        return console.log("title changed");
      }
    };

    Post.prototype.dialog = {
      title: "Edit Event",
      className: "dialogClass",
      buttons: false
    };

    Post.prototype.initialize = function() {
      var _this = this;
      this.model.store();
      return this.listenTo(this.model, 'validated', function(_, __, attrs) {
        return _this.showErrors(attrs);
      });
    };

    Post.prototype.onRender = function() {
      return this.stickit();
    };

    Post.prototype.formSubmitted = function(e) {
      var _this = this;
      e.preventDefault();
      if (this.model.isValid(true)) {
        return this.model.save(null, {
          success: function(post) {
            _this.trigger("dialog:close");
            App.execute("flash:success", "Post #" + _this.model.id + " successfully updated");
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

    Post.prototype.onClose = function() {
      this.model.restore();
      return App.navigate("posts");
    };

    Post.prototype.onDialogButtonClicked = function() {
      return console.log("dialog method onDialogButtonClicked");
    };

    return Post;

  })(Marionette.ItemView);
});
