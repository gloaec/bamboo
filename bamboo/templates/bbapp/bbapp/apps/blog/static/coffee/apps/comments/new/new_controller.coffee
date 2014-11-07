@BambooApp.module "CommentsModule.New", (New, App, Backbone, Marionette, $, _) ->

  class New.Controller extends App.Controllers.Base

    initialize: (options) ->
      {comment, comments} = options

      @newCommentView = @getNewCommentView comment, comments
			
      @listenTo @newCommentView, "form:submitted", =>
        #data = Backbone.Syphon.serialize newView
        #post.processForm data, posts
			
      @show @newCommentView

    getNewCommentView: (comment, comments) ->
      new New.Comment
        model      : comment
        collection : comments

