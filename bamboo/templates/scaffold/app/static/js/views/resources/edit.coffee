class App.module('Views.{{ resource.title() }}s').Edit extends Backbone.Marionette.ItemView

  className : 'row'
  template  : '{{ resource }}s/edit'

  events:
    "submit form" : "update"

  bindings:
    {{ attributes.coffee_bindings() }}

  initialize: ->
    @listenTo @model, 'validated', (_, __, attrs)=> @showErrors(attrs)

  onRender: ->
    @stickit()
    @validateit()
    
  update: (e) ->
    e.preventDefault()

    @model.save null,
      success: =>
        App.flash "\"<{{ resource.title() }} ##{@model.id}>\" successfully updated", 'success'
        App.router.navigate "/{{ resource }}s", trigger: true
      error: (post, jqXHR) =>
        @showErrors $.parseJSON(jqXHR.responseText).errors
