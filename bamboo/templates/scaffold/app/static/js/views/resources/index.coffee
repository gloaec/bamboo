class App.module('Views.{{ resource.title() }}s').Index extends Backbone.Marionette.CompositeView

  template          : '{{ resource }}s/index'
  itemViewContainer : 'tbody.{{ resource }}s'

  initialize: ->
    @itemView = App.Views.{{ resource.title() }}s.{{ resource.title() }}
