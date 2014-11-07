@BambooApp.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->

  class Entities.Todo extends Entities.Model

    urlRoot: -> "/api/todos"

    defaults:
      content: ""
      is_completed: false

    validation:
      content:[
        maxLength: 50
        msg: 'Todo is too long (50 chars maximum)'
      ,
        required: true
      ]

    
  class Entities.TodosCollection extends Entities.Collection

    model: Entities.Todo

    url: -> "/api/todos"

    comparator: (m) ->
      m.get "created_at"

    getByAuthorID: (id) ->
      @where author_id: id

    getCompleted: ->
      new Entities.TodosCollection @where is_completed: true

    getActive: ->
      new Entities.TodosCollection @where is_completed: false
          
  API =
    getTodos: () ->
      todos = new Entities.TodosCollection
      todos.fetch reset: true
      todos

    getTodo: (id) ->
      todo = new Entities.Todo id: id
      todo.fetch()
      todo

  App.reqres.setHandler "todo:entities", ->
    API.getTodos()
    
  App.reqres.setHandler "todo:entity", (id) ->
    API.getTodo id
