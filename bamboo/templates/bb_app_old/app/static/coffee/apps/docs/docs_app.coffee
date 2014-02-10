@BambooApp.module "DocsApp", (DocsApp, App, Backbone, Marionette, $, _) ->

  class DocsApp.Router extends Marionette.SubRouter

    prefix: 'docs'

    appRoutes:
      "*"        : "showGetStarted"
      "commands" : "listCommands"
		
  API =

    showGetStarted: ->
      @controller = new DocsApp.Show.Controller unless @controller?._mainView
      @controller.showGetStarted()

    listCommands: ->
      @controller = new DocsApp.Show.Controller unless @controller?._mainView
      @controller.listCommands()
			
  App.addInitializer ->
    new DocsApp.Router
      controller: API
	
