class App.Routers.Folders extends Backbone.Marionette.SubRouter
  prefix: '/folders'
  controller: App.Controllers.Folders
  appRoutes:
    ''            : 'index'
    '/:id'        : 'show'
    '/:id/new'    : 'new'
    '/:id/edit'   : 'edit'

class App.Controllers.Folders
  showView: (view)->
    App.mainRegion.show view

  index: ->
    @showView new App.Views.Folders.Index collection: @folders

  show: (id) ->
    console.log 'show', id
    @showView new App.Views.Folders.Show model: @folders.get(id)

  new: ->
    @showView new App.Views.Folders.New collection: @folders

  edit: (id) ->
    @showView new App.Views.Folders.Edit model: @folders.get(id)
