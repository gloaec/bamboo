@BambooApp.module "PostsModule.New", (New, App, Backbone, Marionette, $, _) ->

  class New.Post extends App.Views.ItemView
    template: "posts/new/new_post"
    className: "container"

    initialize: ->
      @listenTo @model, 'validated', (_, __, attrs) => @showErrors(attrs)

    ui:
      "title"       : "#title"
      "content"     : "#content"

    events:
      'submit form' : 'formSubmitted'

    bindings:
      "#title"      : "title"
      "#content"    : "content"

    onRender: ->
      @stickit()
      @validateit()

    formSubmitted: (e) ->
      e.preventDefault()
      if @model.isValid(true)
        @model.save null,
          success: =>
            @collection.add @model
            App.execute "flash:success", "Post ##{@model.id} successfully created"
            App.navigate "posts", trigger: true
          error: (post, jqXHR) =>
            @showErrors $.parseJSON(jqXHR.responseText).errors
