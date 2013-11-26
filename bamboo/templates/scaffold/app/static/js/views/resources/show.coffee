class App.module('Views.{{ resource.title() }}s').Show extends Backbone.Marionette.ItemView

  className : 'row'
  template  : '{{ resource }}s/show'

  bindings:
    {{ attributes.coffee_bindings() }}

  onRender: ->
    @stickit()
