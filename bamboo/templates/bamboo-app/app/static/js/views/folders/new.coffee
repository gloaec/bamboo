class App.module('Views.Folders').New extends Backbone.Marionette.ItemView

  className : 'row'
  template  : 'folders/new'

  events:
    "submit form" : "save"

  bindings:
    '#name'        : 'name'
    '#description' : 'description'

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
          App.flash "\"#{@model.get('name')}\" successfully created", 'success'
          App.router.navigate("/folders/#{@model.id}", trigger: true)
        error: (post, jqXHR) =>
          @showErrors $.parseJSON(jqXHR.responseText).errors
