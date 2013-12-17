@BambooApp.module "PostsModule.Show", (Show, App, Backbone, Marionette, $, _) ->

  class Show.Post extends App.Views.ItemView
    template: "posts/show/show_view"
    className: "container"
    bindings:
      '#title'  : 'title'
      '#content': 'content'
    onRender: -> @stickit()

