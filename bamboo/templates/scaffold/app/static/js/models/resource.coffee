class App.Models.{{ resource.title() }} extends Backbone.Model

  urlRoot   : '/api/{{ resource }}s'
  paramRoot : '{{ resource }}'

  defaults:
    {{ attributes.coffee_defaults() }}

class App.Collections.{{ resource.title() }}s extends Backbone.Collection
  model: App.Models.{{ resource.title() }}
  url: '/api/{{ resource }}s'
