@BambooApp.module "PostsModule.List", (List, App, Backbone, Marionette, $, _) ->

  class List.Controller extends App.Controllers.Base

    initialize: ->
      posts = App.request "post:entities"
		
      App.execute "when:fetched", posts, =>
        ## perform aggregates / sorting / nesting here
        ## this is helpful when you want to perform operations but only after
        ## all the required dependencies have been fetched and are available
        posts.reset posts.sortBy "created_at"
				
      @layout = @getLayoutView()
			
      @listenTo @layout, "show", =>
        @resultsView posts
        @postsView posts
        @paginationView posts
			
      @show @layout,
        loading:
          entities: posts
		
    resultsView: (posts) ->
      resultsView = @getResultsView posts
      @show resultsView, region: @layout.resultsRegion
		
    postsView: (posts) ->
      postsView = @getPostsView posts
      @show postsView, region: @layout.postsRegion
		
    paginationView: (posts) ->
      paginationView = @getPaginationView posts
      @show paginationView, region: @layout.paginationRegion
		
    getResultsView: (posts) ->
      new List.Results
        collection: posts
		
    getPaginationView: (posts) ->
      new List.Pagination
        collection: posts
		
    getPostsView: (posts) ->
      new List.Posts
        collection: posts
		
    getLayoutView: ->
      new List.Layout
