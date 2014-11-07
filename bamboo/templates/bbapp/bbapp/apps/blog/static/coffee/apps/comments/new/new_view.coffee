@BambooApp.module "CommentsModule.New", (New, App, Backbone, Marionette, $, _) ->

  class New.Comment extends App.Views.ItemView
    template: "comments/new/_new_comment"
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
          url: @collection.url()
          success: =>
            @collection.add @model
            App.execute "flash:success", "Comment successfully created"
            App.navigate "posts/#{@collection.options.post_id}", trigger: true
            @model = new @collection.model()
            @render()
          error: (comment, jqXHR) =>
            @showErrors $.parseJSON(jqXHR.responseText).errors
