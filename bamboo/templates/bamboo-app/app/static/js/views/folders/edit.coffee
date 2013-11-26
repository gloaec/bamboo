class App.module('Views.Folders').Edit extends Backbone.Marionette.ItemView

  className : 'row'
  template  : 'folders/edit'

  events:
    "submit #edit-post" : "update"

  bindings:
    '#name'        : 'name'
    '#description' : 'description'

  initialize: ->
    @listenTo @model, 'validated', (_, __, attrs)=> @showErrors(attrs)

  onRender: ->
    @stickit()
    @validateit()
    
  update: (e) ->
    e.preventDefault()

    @model.save null,
      success: =>
        App.flash "\"#{@model.get('name')}\" successfully updated", 'success'
        App.router.navigate "/folders", trigger: true
      error: (post, jqXHR) =>
        @showErrors $.parseJSON(jqXHR.responseText).errors
