class App.module('Views.{{ resource.title() }}s').{{ resource.title() }} extends Backbone.Marionette.ItemView

  tagName: "tr"
  template: '{{ resource }}s/{{ resource }}'

  events:
    "click .destroy" : "destroy"

  bindings:
    {{ attributes.coffee_bindings() }}

  destroy: (e)->
    e.preventDefault()
    @model.destroy()

  onRender: ->
    @stickit()
