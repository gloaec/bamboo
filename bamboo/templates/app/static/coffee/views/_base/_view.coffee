@BambooApp.module "Views", (Views, App, Backbone, Marionette, $, _) ->

  _.extend Backbone.View::,
  
    validateit: ->
      Backbone.Validation.bind @
  
    showErrors: (errors) ->
      @$('.help-block').text ''
      @$('.has-error').removeClass 'has-error'
      if errors?
        for attr_name, msg of errors
          msg = msg.first() if _.isArray msg
  
          selector = Object.keys(@bindings).find (selector) =>
            @bindings[selector] == attr_name
          if selector?
            @$(selector).parent().addClass('has-error')
            @$(selector).next('.help-block').text(msg)


  _.extend Marionette.View::,

    templateHelpers: ->
