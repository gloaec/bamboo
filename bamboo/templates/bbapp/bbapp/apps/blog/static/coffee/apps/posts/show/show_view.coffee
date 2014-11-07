@BambooApp.module "PostsModule.Show", (Show, App, Backbone, Marionette, $, _) ->

  class Show.Post extends App.Views.ItemView
    template: "posts/show/_post"
    className: "container"

    initialize: ->
      @listenTo @model, 'add:comments remove:comments change:comments', @render, @
    
    bindings:
      '#title'  : 'title'
      '#content': 'content'
      '#nbcomments':
        observe: "comments"
        onGet: (value) -> value.size()
      
    onRender: ->
      @stickit()
      
  class Show.Layout extends App.Views.Layout
    template: "posts/show/show_layout"

    regions:
      postRegion:        "#post-region"
      commentsRegion:    "#comments-region"

