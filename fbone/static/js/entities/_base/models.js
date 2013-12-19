var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
  return Entities.Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      Model.__super__.constructor.apply(this, arguments);
    }

    Model.prototype.initialize = function() {
      _.extend(this, new Backbone.Memento(this));
      this.store();
      return Model.__super__.initialize.apply(this, arguments);
    };

    Model.prototype.save = function() {
      this.store();
      return Model.__super__.save.apply(this, arguments);
    };

    Model.prototype.parse = function(data) {
      var key, nested, val, _ref;
      if (_.isObject(data)) {
        for (key in data) {
          val = data[key];
          if (_(key).endsWith('_at')) data[key] = new Date(val);
        }
        _ref = this.relations;
        for (key in _ref) {
          val = _ref[key];
          nested = val.prototype instanceof Backbone.Collection && _.isArray(data[key]);
          nested || (nested = val.prototype instanceof Backbone.Model && _.isObject(data[key]));
          if (nested) data[key] = new val(data[key]);
        }
      }
      return Model.__super__.parse.call(this, data);
    };

    Model.prototype.toJSON = function() {
      var attributes, key, val;
      attributes = Model.__super__.toJSON.apply(this, arguments);
      for (key in attributes) {
        val = attributes[key];
        if (val instanceof Backbone.Model) attributes[key] = val.toJSON();
      }
      return attributes;
    };

    return Model;

  })(Backbone.Model);
});
