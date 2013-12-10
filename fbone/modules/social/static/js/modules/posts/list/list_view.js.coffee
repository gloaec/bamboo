@BambooApp.module "PostsModule.List", (List, App, Backbone, Marionette, $, _) ->

  class List.Layout extends App.Views.Layout
    template: "posts/list/list_layout"
    regions:
      resultsRegion: 		"#results-region"
      postsRegion:		  "#posts-region"
      paginationRegion:	"#pagination-region"

  class List.Post extends App.Views.ItemView
    template: "posts/list/_post"
    tagName: "tr"

  class List.Posts extends App.Views.CompositeView
    template: "posts/list/_posts"
    itemView: List.Post
    itemViewContainer: "tbody"

  class List.Results extends App.Views.ItemView
    template: "posts/list/_results"

  class List.Pagination extends App.Views.ItemView
    template: "posts/list/_pagination"
