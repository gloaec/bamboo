var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  return Entities.Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      Model.__super__.constructor.apply(this, arguments);
    }

    Model.mixin('selectable');

    Model.mixin('storable');

    Model.mixin('validable');

    Model.prototype.save = function(key, val, options) {
      var attrs, success,
        _this = this;
      if (!(key != null) || _.isObject(key)) {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }
      success = options.success;
      options.success = function(model, resp, options) {
        _this.store();
        if (success) return success(model, resp, options);
      };
      return Model.__super__.save.apply(this, arguments);
    };

    Model.prototype.parse = function(data) {
      var key, val;
      if (_.isObject(data)) {
        for (key in data) {
          val = data[key];
          if (_(key).endsWith('_at')) data[key] = new Date(val);
        }
      }
      return Model.__super__.parse.call(this, data);
    };

    Model.prototype.toJSON = function() {
      var attributes;
      attributes = Model.__super__.toJSON.apply(this, arguments);
      return attributes;
    };

    return Model;

  })(Backbone.Model);
});
