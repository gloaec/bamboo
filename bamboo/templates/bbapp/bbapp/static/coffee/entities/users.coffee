@BambooApp.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->
	
  class Entities.User extends Entities.Model

    urlRoot: -> "/api/users"

    #relations: [
    #  type: Backbone.Many
    #  key: 'posts'
    #  relatedModel: 'BambooApp.Entities.Post'
    #]

    #defaults:
    #  posts: []


  class Entities.UsersCollection extends Entities.Collection

    model: Entities.User

    url: -> "/api/users"
	

  API =
    getUsers: ->
      users = new Entities.UsersCollection
      users.fetch()
      users

    getUser: (id) ->
      user = new Entities.User id: id
      user.fetch()
      user
	
  App.reqres.setHandler "user:entities", ->
    API.getUsers()

  App.reqres.setHandler "user:entity", (id) ->
    API.getUser(id)
