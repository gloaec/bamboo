@BambooApp.module "PostsModule.Edit", (Edit, App, Backbone, Marionette, $, _) ->
	
  class Edit.Post extends Marionette.ItemView
    template: "posts/edit/templates/edit_post"
		
    bindings:
      "#title"   : "title"
      "#content" : "content"

    events:
      "submit form"  : "formSubmitted"
      "click .close" : -> @trigger "dialog:close"

    modelEvents:
      "change:title" : -> console.log "title changed"

    dialog:
      title: "Edit Event"
      className: "dialogClass"
      buttons: false

    initialize: ->
      @model.store()
      @listenTo @model, 'validated', (_, __, attrs) => @showErrors(attrs)

    onRender: ->
      @stickit()
      #@validateit()

    formSubmitted: (e) ->
      e.preventDefault()
      if @model.isValid(true)
        @model.save null,
          success: (post) =>
            @trigger "dialog:close"
            App.execute "flash:success", "Post ##{@model.id} successfully updated"
            App.navigate "posts", trigger: true
          error: (post, jqXHR) =>
            @showErrors $.parseJSON(jqXHR.responseText).errors

    onClose: ->
      @model.restore()
      App.navigate "posts"

    onDialogButtonClicked: ->
      console.log "dialog method onDialogButtonClicked"
