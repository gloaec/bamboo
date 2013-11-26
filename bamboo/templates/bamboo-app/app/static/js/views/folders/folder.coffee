class App.module('Views.Folders').Folder extends Backbone.Marionette.ItemView

  tagName: "tr"
  template: 'folders/folder'

  events:
    "click .destroy" : "destroy"

  bindings:
    '#name'        : 'name'
    '#description' : 'description'

  destroy: (e)->
    e.preventDefault()
    @model.destroy()

  onRender: ->
    @stickit()
