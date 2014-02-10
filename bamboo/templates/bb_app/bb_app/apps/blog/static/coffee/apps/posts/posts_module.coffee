@BambooApp.module "PostsModule", (PostsModule, App, Backbone, Marionette, $, _) ->

  class PostsModule.Router extends Marionette.SubRouter

    prefix: "posts"

    appRoutes:
      ""         : "list"
      "new"      : "new"
      ":id"      : "show"
      ":id/edit" : "edit"


  API =
    list: (posts=false) ->
      new PostsModule.List.Controller posts: posts

    new: (posts=false) ->
      new PostsModule.New.Controller posts: posts

    show: (id, post=false) ->
      new PostsModule.Show.Controller id: id, post: post

    edit: (id, post=false) ->
      new PostsModule.Edit.Controller id: id, post: post

    delete: (id, post=false) ->
      post.destroy()


  App.vent.on "posts:clicked", (posts) ->
    App.navigate "posts"
    API.list posts

  App.vent.on "post:clicked", (post) ->
    App.navigate "posts/#{post.id}"
    API.show post.id, post

  App.vent.on "new:post:clicked", (posts) ->
    App.navigate "posts/new"
    API.new posts

  App.vent.on "edit:post:clicked", (post) ->
    App.navigate "posts/#{post.id}/edit"
    API.edit post.id, post

  App.vent.on "delete:post:clicked", (post) ->
    App.navigate "posts/#{post.id}/delete"
    API.delete post.id, post

  App.addInitializer ->
    new PostsModule.Router
      controller: API
