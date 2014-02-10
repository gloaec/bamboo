@BambooApp.module "PostsModule.Show", (Show, App, Backbone, Marionette) ->

  class Show.Controller extends App.Controllers.Base

    initialize: (options) ->
      post = options.post or= App.request "post:entity", options.id

      @showView = @getShowView post
			
      @show @showView,
        loading:
          entities: post

    getShowView: (post) ->
      new Show.Post
        model: post
