@BambooApp.module "PostsModule.Show", (Show, App, Backbone, Marionette) ->

  class Show.Controller extends App.Controllers.Base

    initialize: (options) ->
      post = options.post or= App.request "post:entity", options.id

      @layout = @getLayoutView()
      
      @listenTo @layout, "show", =>
        @postView post
        @commentsView post

      @show @layout,
        loading:
          entities: post

    postView: (post) ->
      postView = @getPostView post
      @show postView, region: @layout.postRegion

    commentsView: (post) ->
      commentsView = App.execute "list:post:comments",
        post: post
        region: @layout.commentsRegion

    getPostView: (post) ->
      new Show.Post
        model: post

    getLayoutView: ->
      new Show.Layout
