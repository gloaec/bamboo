@BambooApp.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->
	
  class Entities.User extends Entities.Model
    urlRoot: -> "/api/users"

  class Entities.UsersCollection extends Entities.Collection
    model: Entities.User
    url: -> "/api/users"
	
  API =
    getUsers: ->
      new Entities.UsersCollection

    getUser: (id) ->
      user = new Entities.User id: id
      user.fetch()
      user
	
  App.reqres.setHandler "user:entities", ->
    API.getUsers()

  App.reqres.setHandler "user:entity", (id) ->
    API.getUser(id)
