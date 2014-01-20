var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("Controllers", function(Controllers, App, Backbone, Marionette, $, _) {
  return Controllers.Base = (function(_super) {

    __extends(Base, _super);

    function Base(options) {
      if (options == null) options = {};
      this.region = options.region || App.request("default:region");
      this._instance_id = _.uniqueId("controller");
      App.execute("register:instance", this, this._instance_id);
      Base.__super__.constructor.apply(this, arguments);
    }

    Base.prototype.close = function() {
      App.execute("unregister:instance", this, this._instance_id);
      this._mainView = null;
      return Base.__super__.close.apply(this, arguments);
    };

    Base.prototype.show = function(view, options) {
      if (options == null) options = {};
      _.defaults(options, {
        loading: false,
        region: this.region
      });
      this._setMainView(view);
      return this._manageView(view, options);
    };

    Base.prototype._setMainView = function(view) {
      if (this._mainView) return;
      this._mainView = view;
      return this.listenTo(view, "close", this.close);
    };

    Base.prototype._manageView = function(view, options) {
      if (options.loading) {
        return App.execute("show:loading", view, options);
      } else {
        return options.region.show(view);
      }
    };

    return Base;

  })(Marionette.Controller);
});
