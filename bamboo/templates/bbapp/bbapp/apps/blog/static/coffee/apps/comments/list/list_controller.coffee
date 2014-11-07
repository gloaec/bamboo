@BambooApp.module "CommentsModule.List", (List, App, Backbone, Marionette, $, _) ->

  class List.Controller extends App.Controllers.Base

    initialize: (options) ->
      {post, region} = options

      @layout = @getLayoutView()

      comments = App.request "post:comment:entities", post

      comment = new comments.model()
      
      @listenTo @layout, "show", =>
        @newCommentView comment, comments
        @listCommentsView comments

      @show @layout,
        region: region

    listCommentsView: (comments) ->
      commentsView = @getCommentsView comments

      commentsView.on "childview:delete:comment:clicked", (iv, comment) ->
        App.vent.trigger "delete:comment:clicked", comment

      @show commentsView,
        loading: true
        region: @layout.listCommentsRegion
        
    newCommentView: (comment, comments) ->
      newCommentView = App.execute "list:post:newcomment",
        comment: comment
        comments: comments
        region: @layout.newCommentRegion

    getNewCommentView: (comment, comments) ->
      new List.New
        model: comment
        collection: comments
        
    getCommentsView: (comments) ->
      new List.Comments
        collection: comments

    getLayoutView: ->
      new List.Layout
