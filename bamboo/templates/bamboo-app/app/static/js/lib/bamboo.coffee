App.flashes = []

App.flash = (msg, type='info', icon=null)->
  App.flashes.push $ JST['core/alert'].call
    class : "alert-#{type} fade in"
    text  : msg
    icon  : icon ? switch type
      when 'info' then 'icon-info'
      when 'warning' then 'icon-warning'
      when 'error' then 'icon-remove'
      when 'success' then 'icon-ok'
      else 'icon-info'

String.prototype.trunc = String.prototype.truncate

_.extend Backbone.Model.prototype, Backbone.Validation.mixin

#_.extend Backbone.Model.prototype,
#  toJSONnoid: ->
#    Backbone.Model.prototype.toJSON.call @
#  toJSON: ->
#    _.extend(@toJSON(), id: @id)

_.extend Backbone.View.prototype,

  validateit: ->
    Backbone.Validation.bind @

  showErrors: (errors)->
    @$('.help-block').text ''
    @$('.has-error').removeClass 'has-error'
    if errors?
      for attr_name, msg of errors
        msg = msg.first() if Array.isArray msg
        selector = Object.keys(@bindings).find (selector)=>
          @bindings[selector] == attr_name
        if selector?
          @$(selector).parent().addClass('has-error')
          @$(selector).next('.help-block').text(msg)

Backbone.Marionette.Renderer.render = (template, data)->
  throw "Template '#{template}' not found!" unless JST[template]?
  JST[template].call(data)

_.extend Backbone.Marionette.View.prototype,
  remove: ->
    @$el.slideUp 'slow', ->
      $(@).remove()

_.extend Backbone.Marionette.Region.prototype,
  show: (view)->
    @ensureEl()
    view.render()
    @close ->
      return if @currentView && @currentView != view
      @currentView = view
      @open view, ->
        view.onShow() if view.onShow
        view.trigger "show"
        @onShow(view) if @onShow
        @trigger "view:show", view

  close: (cb) ->
    view = @currentView
    delete @currentView
    if !view
      cb.call @ if cb
      return
    view.$el.fadeOut "fast", =>
      view.close() if view.close
      @trigger "view:closed", view
      cb.call @ if cb

  open: (view, callback)->
    @$el.html view.$el.hide()
    view.$el.fadeIn "fast", =>
      $('[data-spy="scroll"]').each ->
        $(@).scrollspy 'refresh'
      callback.call @
