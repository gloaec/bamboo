@BambooApp.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->

  class Entities.Author extends Entities.Model
    @mixin Entities.User

    relations: [
      type: Backbone.Many
      key: 'posts'
      relatedModel: 'BambooApp.Entities.Post'
    ]

    defaults:
      posts: []

  class Entities.Post extends Entities.Model

    urlRoot: -> "/api/posts"

    relations: [
      type: Backbone.One
      key: 'author'
      relatedModel: 'BambooApp.Entities.User'
    ]

    defaults:
      author: null

    validation:
      title: [
        required: true
        msg: 'Title is required'
      ,
        pattern: /^[A-Z]/
        msg: 'Must start with capital letter'
      ]
      content:
        maxLength: 140
        msg: 'Post is too long (140 chars maximum)'

    
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
