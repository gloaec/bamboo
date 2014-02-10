@BambooApp.module "PostsModule.New", (New, App, Backbone, Marionette, $, _) ->

  class New.Controller extends App.Controllers.Base

    initialize: (options) ->
      posts = options.posts or= App.request "post:entities"
      post = new posts.model()

      @newView = @getNewView post, posts
			
      @listenTo @newView, "form:submitted", =>
        #data = Backbone.Syphon.serialize newView
        #post.processForm data, posts
			
      @show @newView

    getNewView: (post, posts) ->
      new New.Post
        model      : post
        collection : posts
