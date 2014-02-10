@BambooApp.module "PostsModule.Edit", (Edit, App, Backbone, Marionette, $, _) ->
	
  class Edit.Controller extends App.Controllers.Base

    initialize: (options) ->
      post = options.post or= App.request "post:entity", options.id

      @editView = @getEditView post

      @editView.on "dialog:button:clicked", ->
        console.log "editView instance dialog:button:clicked"

      App.dialogRegion.show @editView

    getEditView: (post) ->
      new Edit.Post
        model: post
