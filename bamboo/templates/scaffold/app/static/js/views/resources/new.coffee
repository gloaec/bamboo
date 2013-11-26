class App.module('Views.{{ resource.title() }}s').New extends Backbone.Marionette.ItemView

  className : 'row'
  template  : '{{ resource }}s/new'

  events:
    "submit form" : "save"

  bindings:
    {{ attributes.coffee_bindings() }}

  initialize: (options) ->
    @model = new @collection.model()
    console.log('model', @model)
    @listenTo @model, 'validated', (_, __, attrs)=> @showErrors(attrs)

  onRender: ->
    @stickit()
    @validateit()

  save: (e) ->
    e.preventDefault()

    if @model.isValid(true)
      @model.save null,
        success: =>
          @collection.add @model
          App.flash "\"<{{ resource.title() }} ##{@model.id}>\" successfully created", 'success'
          App.router.navigate("/{{ resource }}s/#{@model.id}", trigger: true)
        error: (post, jqXHR) =>
          @showErrors $.parseJSON(jqXHR.responseText).errors
