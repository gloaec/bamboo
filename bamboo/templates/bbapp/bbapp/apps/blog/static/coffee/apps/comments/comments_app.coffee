@BambooApp.module "CommentsModule", (CommentsModule, App, Backbone, Marionette, $, _) ->
		
  API =
    list: (options) ->
      new CommentsModule.List.Controller options

    new: (options) ->
      new CommentsModule.New.Controller options

    delete: (id, comment=false) ->
      comment.destroy()

  App.commands.setHandler "list:post:comments", (options) ->
    API.list options

  App.commands.setHandler "list:post:newcomment", (options) ->
    API.new options
    
  App.vent.on "delete:comment:clicked", (comment) ->
    App.execute "flash:error", "Comment successfully deleted"
    App.navigate "posts/#{comment.collection.options.post_id}"
    API.delete comment.id, comment
