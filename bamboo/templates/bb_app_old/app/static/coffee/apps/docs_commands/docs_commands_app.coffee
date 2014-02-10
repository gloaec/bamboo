@BambooApp.module "DocsCommandsApp", (DocsCommandsApp, App, Backbone, Marionette, $, _) ->
	
  API =
    list: (region) ->
      new DocsCommandsApp.List.Controller
        region: region
	
  App.commands.setHandler "list:docs:commands", (region) ->
    API.list region
