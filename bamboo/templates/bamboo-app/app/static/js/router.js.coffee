class App.Routers.Main extends Backbone.Marionette.AppRouter
  appRoutes:
    ''                   : 'root'
    'back'               : 'back'
    'commands'           : 'commands'
    'folders'            : 'index'
    'folders/new'        : 'new'
    'folders/:id'        : 'show'
    'folders/:id/edit'   : 'edit'

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

  index: ->
    @showView new App.Views.Folders.Index collection: App.folders

  show: (id) ->
    @showView new App.Views.Folders.Show model: App.folders.get(id)

  new: ->
    @showView new App.Views.Folders.New collection: App.folders

  edit: (id) ->
    @showView new App.Views.Folders.Edit model: App.folders.get(id)
