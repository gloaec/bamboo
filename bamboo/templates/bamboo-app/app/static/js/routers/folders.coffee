class App.Routers.Folders extends Backbone.Marionette.SubRouter

  prefix: 'folders'

  appRoutes:
    ''           : 'index'
    'new'        : 'new'
    ':id'        : 'show'
    ':id/edit'   : 'edit'

class App.Controllers.Folders
  showView: (view)->
    App.mainRegion.show view

  index: ->
    @showView new App.Views.Folders.Index collection: App.folders

  show: (id) ->
    console.log 'show', id
    @showView new App.Views.Folders.Show model: App.folders.get(id)

  new: ->
    @showView new App.Views.Folders.New collection: App.folders

  edit: (id) ->
    @showView new App.Views.Folders.Edit model: App.folders.get(id)
