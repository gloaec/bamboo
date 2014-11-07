@BambooApp.module "Views", (Views, App, Backbone, Marionette, $, _) ->

        #  _.extend Backbone.Marionette.Region::,
        #
        #    show: (view)->
        #      @ensureEl()
        #      view.render()
        #      @close ->
        #        return if @currentView && @currentView != view
        #        @currentView = view
        #        @open view, ->
        #          view.onShow() if view.onShow
        #          view.trigger "show"
        #          @onShow(view) if @onShow
        #          @trigger "view:show", view
        #  
        #    close: (cb) ->
        #      view = @currentView
        #      delete @currentView
        #      if !view
        #        cb.call @ if cb
        #        return
        #      view.$el.fadeOut "fast", =>
        #        view.close() if view.close
        #        @trigger "view:closed", view
        #        cb.call @ if cb
        #  
        #    open: (view, callback)->
        #      @$el.html view.$el.hide()
        #      view.$el.fadeIn "fast", =>
        #        $('[data-spy="scroll"]').each ->
        #          $(@).scrollspy 'refresh'
        #        callback.call @
