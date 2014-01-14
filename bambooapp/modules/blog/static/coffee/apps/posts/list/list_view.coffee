@BambooApp.module "PostsModule.List", (List, App, Backbone, Marionette, $, _) ->

  class List.Layout extends App.Views.Layout
    template: "posts/list/list_layout"

    regions:
      resultsRegion: 		"#results-region"
      postsRegion:		  "#posts-region"
      paginationRegion:	"#pagination-region"


  class List.Post extends App.Views.ItemView
    template: "posts/list/_post"

    initialize: ->
      @timer = setInterval =>
        @model.trigger "change:updated_at", @model
        @model.trigger "change:created_at", @model
      , 30000

    bindings:
      ".title"      : "title"
      ".content"    : "content"
      ".updated_at" :
        observe: "updated_at"
        onGet: (value) -> "updated #{moment(value).fromNow()}" if value
      ".created_at" :
        observe: "created_at"
        onGet: (value) -> "created #{moment(value).fromNow()}"

    events:
      "click .edit"   : -> @trigger "edit:post:clicked", @model
      "click .delete" : -> @trigger "delete:post:clicked", @model
      "click .title"  : -> @trigger "post:clicked", @model

    onRender: ->
      @stickit()

    onClose: ->
      clearInterval(@timer)


  class List.Posts extends App.Views.CompositeView
    template: "posts/list/_posts"
    itemView: List.Post
    itemViewContainer: "#posts"


  class List.Results extends App.Views.ItemView
    template: "posts/list/_results"

    events:
      "click .new"   : -> @trigger "new:post:clicked", @collection


  class List.Pagination extends App.Views.ItemView
    template: "posts/list/_pagination"
