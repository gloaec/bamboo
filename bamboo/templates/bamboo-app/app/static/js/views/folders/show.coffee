class App.module('Views.Folders').Show extends Backbone.Marionette.ItemView

  className : 'row'
  template  : 'folders/show'

  bindings:
    '#name'        : 'name'
    '#description' : 'description'
    
  onRender: ->
    @stickit()
