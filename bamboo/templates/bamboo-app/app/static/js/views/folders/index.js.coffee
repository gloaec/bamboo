class App.module('Views.Folders').Index extends Backbone.Marionette.CompositeView

  template          : 'folders/index'
  itemViewContainer : 'tbody.folders'

  initialize: ->
    @itemView = App.Views.Folders.Folder
