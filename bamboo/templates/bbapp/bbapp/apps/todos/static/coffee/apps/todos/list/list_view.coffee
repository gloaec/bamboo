@BambooApp.module "TodosModule.List", (List, App, Backbone, Marionette, $, _) ->

  class List.Layout extends App.Views.Layout
    template: "todos/list/list_layout"

    regions:
      todosHeaderRegion: "#todos-header-region"
      todosMainRegion:   "#todos-main-region"
      todosFooterRegion:  "#todos-footer-region"


  class List.Todo extends App.Views.ItemView
    template: "todos/list/_todo"
    tagName: 'li'
    ui:
      checkbox: 'input[type=checkbox]'
      mainCheckbox: '#toggle-all'

    initialize: ->
      @listenTo @model, 'all', @render, @
            
    events:
      "click .destroy" : -> @trigger 'destroy:todo:clicked', @model
      "click .toggle" : 'onToggle'

    onToggle : =>
      if @model.get('is_completed')
        document.getElementById('toggle-all').checked = false
      @model.set('is_completed', not @model.get('is_completed'))
      @model.save null,
        success: =>
          #@trigger 'toggle:todo:clicked', @collection
        error: (todo, jqXHR) =>
          @showErrors $.parseJSON(jqXHR.responseText)

      
    onRender: ->
      if @model.get('is_completed')
        @$el.prop('class', 'completed')
        @ui.checkbox.prop('checked', true)
      else
        @$el.prop('class', 'active')
        @ui.checkbox.prop('checked', false)
      @stickit()


  class List.Todos extends App.Views.CompositeView
    template: "todos/list/_todos"
    itemView: List.Todo
    itemViewContainer: "#todo-list"

    events:
      "click #toggle-all" : 'onToggleAll'

    onToggleAll: (e) ->
      wasChecked = not e.target.checked
      if wasChecked
        e.target.checked = false
        _.each @collection.models, (model) =>
          model.set('is_completed', false)
      else
        e.target.checked = true
        _.each @collection.models, (model) =>
          model.set('is_completed', true)
        

  class List.NewTodo extends App.Views.ItemView
    template: "todos/list/_newtodo"

    initialize: ->
      @listenTo @model, 'validated', (_, __, attrs) => @showErrors(attrs)
        
    bindings:
      '#new-todo': "content"
    
    events:
      "keypress #new-todo"   : 'onKeyPress'

    onKeyPress : (e) =>
      ENTER = 13
      switch e.which
        when ENTER
          if @model.isValid(true)
            @model.save null,
              success: =>
                @collection.add(@model)
                #App.execute 'flash:success', "Todo successfully created"
                @trigger 'new:todo:clicked', @collection
              error: (todo, jqXHR) =>
                @showErrors $.parseJSON(jqXHR.responseText)
    
    onRender: ->
      @stickit()
      @validateit()

  class List.Footer extends App.Views.ItemView
    template: "todos/list/_footer"

    initialize: ->
      @listenTo @collection, 'all', @render, @

    events:
      "click #clear-completed" : -> @trigger 'clear-completed:todos:clicked', @collection

    serializeData: ->
      _.extend super(),
        completedCount: @collection.getCompleted().size()
        itemsLeft: @collection.size()-@collection.getCompleted().size()
      
