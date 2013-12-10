var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

(function(Backbone, Marionette) {
  return Marionette.Region.Dialog = (function(_super) {

    __extends(Dialog, _super);

    function Dialog() {
      _.extend(this, Backbone.Events);
    }

    Dialog.prototype.open = function(view) {
      return this.$el.empty().append($('<div>').addClass('modal-dialog').append($('<div>').addClass('modal-content').append(view.el)));
    };

    Dialog.prototype.onShow = function(view) {
      var options,
        _this = this;
      this.setupBindings(view);
      options = this.getDefaultOptions(_.result(view, "dialog"));
      this.$el.modal(options);
      return this.$el.on("hidden.bs.modal", function() {
        return _this.closeDialog();
      });
    };

    Dialog.prototype.getDefaultOptions = function(options) {
      if (options == null) options = {};
      return _.defaults(options, {
        backdrop: true,
        keyboard: true,
        show: true,
        remote: false
      });
    };

    Dialog.prototype.setupBindings = function(view) {
      this.listenTo(view, "dialog:close", this.closeDialog);
      return this.listenTo(view, "dialog:title", this.titleizeDialog);
    };

    Dialog.prototype.closeDialog = function() {
      this.$el.modal('hide');
      this.stopListening();
      this.close();
      return this.$el.empty();
    };

    Dialog.prototype.titleizeDialog = function(title) {
      return this.$('.modal-title').html(title);
    };

    return Dialog;

  })(Marionette.Region);
})(Backbone, Marionette);
