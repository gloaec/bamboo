class App.Routers.Main extends Backbone.Marionette.AppRouter
  appRoutes:
    ''                   : 'root'
    'back'               : 'back'
    'commands'           : 'commands'
    '*subroute'          : 'subroute'

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

  subroute: (subroute) ->
    new App.Routers.Folders controller: new App.Controllers.Folders()
