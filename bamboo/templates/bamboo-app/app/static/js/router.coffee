class App.Routers.Main extends Backbone.Marionette.AppRouter
  appRoutes:
    ''                   : 'root'
    'back'               : 'back'
    'commands'           : 'commands'
    '*other'             : 'other'

class App.Controllers.Main
  constructor: ->

  showView: (view)->
    App.mainRegion.show view

  root: ->
    @showView new App.Views.Home

  back: ->
    window.history.back()
    window.history.back()

  commands: ->
    @showView new App.Views.Commands

  # DO NOT MODIFY
  other: (route) ->
    new App.Routers.Folders controller: new App.Controllers.Folders(route)
