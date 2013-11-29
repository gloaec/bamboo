do (Backbone) ->
	
  _.extend Backbone.Marionette.Application::,

    navigate: (route, options = {}) ->
      Backbone.history.navigate route, options
	
    getCurrentRoute: ->
      frag = Backbone.history.fragment
      if _.isEmpty(frag) then null else frag
		
    startHistory: ->
      if Backbone.history
        Backbone.history.start pushState: true
        if Backbone.history._hasPushState
          $(document).delegate 'a', 'click', (event) ->
            event = event || window.event

            # Get the anchor href and protcol
            href = $(@).attr("href")
            protocol = @protocol + "//"
            passThrough = href.indexOf('special_url') >= 0 or $(@).data('reload')?
            passThrough ||= href.slice(protocol.length) is protocol
            passThrough ||= event.altKey or event.ctrlKey or event.metaKey or event.shiftKey

            unless passThrough
            # Ensure the protocol is not part of URL, meaning its relative.
            # Stop the event bubbling to ensure the link will not cause a page refresh.
              event.preventDefault()
              # Note by using Backbone.history.navigate, router events will not be
              # triggered. If this is a problem, change this to navigate on your
              # router.
              Backbone.history.navigate href, true
              false
		
    register: (instance, id) ->
      console.info "Register", id, instance
      @_registry ?= {}
      @_registry[id] = instance
		
    unregister: (instance, id) ->
      console.info "Unregister", id, instance
      delete @_registry[id]
		
    resetRegistry: ->
      oldCount = @getRegistrySize()
      for key, controller of @_registry
        controller.region.close()
      msg = "There were #{oldCount} controllers in the registry, there are now #{@getRegistrySize()}"
      if @getRegistrySize() > 0 then console.warn(msg, @_registry) else console.log(msg)
		
    getRegistrySize: ->
      _.size @_registry
