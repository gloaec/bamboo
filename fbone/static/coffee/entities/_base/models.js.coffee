@BambooApp.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->

  _.extend Backbone.Model::, Backbone.Validation.mixin

  class Entities.Model extends Backbone.Model

    initialize: ->
      _.extend @, new Backbone.Memento @
      @store()
      super

    save: (key, val, options) ->
      if not key? or _.isObject(key)
        attrs = key
        options = val
      else
        (attrs = {})[key] = val
      {success} = options
      options.success = (model, resp, options) =>
        @store()
        success(model, resp, options) if success
      super

    parse: (data) ->
      if _.isObject data
        for key, val of data
          data[key] = new Date(val) if _(key).endsWith '_at'
        for key, val of @relations
          nested   = val.prototype instanceof Backbone.Collection and _.isArray(data[key])
          nested or= val.prototype instanceof Backbone.Model and _.isObject(data[key])
          data[key] = new val(data[key]) if nested
      super data
 
    toJSON: ->
      attributes = super
      for key, val of attributes
        attributes[key] = val.toJSON() if val instanceof Backbone.Model
      attributes
