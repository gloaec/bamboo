@BambooApp.module "PostsModule", (PostsModule, App, Backbone, Marionette, $, _) ->

  class PostsModule.Router extends Marionette.SubRouter

    prefix: 'posts'

    appRoutes:
      ""         : "list"
      "new"      : "new"
      ":id"      : "show"
      ":id/edit" : "edit"

  API =
    list: ->
      new PostsModule.List.Controller
    new: ->
      new PostsModule.New.Controller
    show: (id)->
      new PostsModule.Show.Controller
    edit: (id)->
      new PostsModule.Edit.Controller

  App.addInitializer ->
    new PostsModule.Router
      controller: API
