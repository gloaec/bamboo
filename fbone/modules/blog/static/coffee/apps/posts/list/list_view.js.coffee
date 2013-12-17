@BambooApp.module "PostsModule.List", (List, App, Backbone, Marionette, $, _) ->

  class List.Layout extends App.Views.Layout
    template: "posts/list/list_layout"

    regions:
      resultsRegion: 		"#results-region"
      postsRegion:		  "#posts-region"
      paginationRegion:	"#pagination-region"

  class List.Post extends App.Views.ItemView
    template: "posts/list/_post"

    bindings:
      '.title'  : 'title'
      '.content': 'content'

    events:
      "click .edit"   : -> @trigger "edit:post:clicked", @model
      "click .delete" : -> @trigger "delete:post:clicked", @model
      "click .title"  : -> @trigger "post:clicked", @model

    onRender: -> @stickit()

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
