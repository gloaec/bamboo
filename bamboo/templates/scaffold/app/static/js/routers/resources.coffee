class App.Routers.{{ resource.title() }}s extends Backbone.Marionette.SubRouter

  prefix: '{{ resource }}s'

  appRoutes:
    ''         : 'index'
    'new'      : 'new'
    ':id'      : 'show'
    ':id/edit' : 'edit'

class App.Controllers.{{ resource.title() }}s

  showView: (view)->
    App.mainRegion.show view

  index: ->
    @showView new App.Views.{{ resource.title() }}s.Index collection: App.{{ resource }}s

  show: (id) ->
    @showView new App.Views.{{ resource.title() }}s.Show model: App.{{ resource }}s.get(id)

  new: ->
    @showView new App.Views.{{ resource.title() }}s.New collection: App.{{ resource }}s

  edit: (id) ->
    @showView new App.Views.{{ resource.title() }}s.Edit model: App.{{ resource }}s.get(id)
