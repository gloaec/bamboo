@BambooApp.module "PostsModule.List", (List, App, Backbone, Marionette, $, _) ->

  class List.Controller extends App.Controllers.Base

    initialize: (options) ->
      posts = options.posts or= App.request "post:entities"

      #comments = App.request "comment:entities"
		
      #App.execute "when:fetched", [posts, comments], =>
      App.execute "when:fetched", posts, =>
        #posts.reset posts.sortBy "created_at"
				
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

      resultsView.on "new:post:clicked", (iv, posts) ->
        App.vent.trigger "new:post:clicked", posts

      @show resultsView, region: @layout.resultsRegion
		
    postsView: (posts) ->
      postsView = @getPostsView posts
      
      postsView.on "childview:edit:post:clicked", (iv, post) ->
        App.vent.trigger "edit:post:clicked", post

      postsView.on "childview:post:clicked", (iv, post) ->
        App.vent.trigger "post:clicked", post

      postsView.on "childview:delete:post:clicked", (iv, post) ->
        App.vent.trigger "delete:post:clicked", post

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
