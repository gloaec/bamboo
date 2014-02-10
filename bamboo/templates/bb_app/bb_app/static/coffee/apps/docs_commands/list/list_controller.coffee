@BambooApp.module "DocsCommandsApp.List", (List, App, Backbone, Marionette, $, _) ->

  class List.Controller extends App.Controllers.Base

    initialize: ->
      commands = new Backbone.Collection([]) #App.request "command:entities"
			
      commandsView = @getCommandsView commands
			
      @show commandsView,
        loading: true

    getCommandsView: (commands) ->
      new List.Commands
        collection: commands
