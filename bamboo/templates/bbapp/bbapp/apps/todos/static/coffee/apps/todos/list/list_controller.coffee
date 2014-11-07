@BambooApp.module "TodosModule.List", (List, App, Backbone, Marionette, $, _) ->

  class List.Controller extends App.Controllers.Base

    initialize: (options) ->
      todos = options.todos or= App.request "todo:entities"
      show = options.show

      @layout = @getLayoutView()
			
      @listenTo @layout, "show", =>
        @newTodoView todos
        @todosView @getTodosToShow todos, show
        @footerView todos
			
      @show @layout,
        loading:
          entities: todos

    newTodoView: (todos) ->
      newTodoView = @getNewTodoView todos

      newTodoView.on "new:todo:clicked", (todos) ->
        App.vent.trigger "todos:clicked", todos

      @show newTodoView, region: @layout.todosHeaderRegion
		
    todosView: (todos) ->
      todosView = @getTodosView todos

      todosView.on "childview:destroy:todo:clicked", (iv, todo) ->
        App.vent.trigger "destroy:todo:clicked", todo

      @show todosView,
        loading: true
        region: @layout.todosMainRegion

    footerView: (todos) ->
      footerView = @getFooterView todos

      footerView.on "clear-completed:todos:clicked", (todos) ->
        App.vent.trigger "clear-completed:todos:clicked", todos
        
      @show footerView, region: @layout.todosFooterRegion

    getTodosToShow: (todos, show) ->
      switch show
        when "completed" then return todos.getCompleted()
        when "active" then return todos.getActive()
        else return todos
        
    getNewTodoView: (todos) ->
      new List.NewTodo
        model: new todos.model()
        collection: todos

    getTodosView: (todos) ->
      new List.Todos
        collection: todos

    getFooterView: (todos) ->
      new List.Footer
        collection: todos

    getLayoutView: ->
      new List.Layout
