@BambooApp.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->
	
  class Entities.Post extends Entities.Model

    urlRoot: -> "/api/posts"

    relations:
      parent: @
      author: Entities.User
      #children: Entities.PostsCollection #PEUT PAS

    defaults: {}
      # Defaults here ex:
      # title: "Post title"
 
    validation:
      title: [
        required: true
        msg: 'Title is required'
      ,
        pattern: /^[A-Z]/
        msg: 'Must start with capital letter'
      ]
      content:
        required: false
        maxLength: 120
        msg: 'Post is too long (120 chars maximum)'

    
  class Entities.PostsCollection extends Entities.Collection

    model: Entities.Post

    url: -> "/api/posts"

    comparator: (m) ->
      -m.get "created_at"

    getByAuthorID: (id) ->
      @where author_id: id
	

  API =
    getPosts: () ->
      posts = new Entities.PostsCollection
      posts.fetch reset: true
      posts

    getPost: (id) ->
      post = new Entities.Post id: id
      post.fetch()
      post


  App.reqres.setHandler "post:entities", ->
    API.getPosts()
    
  App.reqres.setHandler "post:entity", (id) ->
    API.getPost id
