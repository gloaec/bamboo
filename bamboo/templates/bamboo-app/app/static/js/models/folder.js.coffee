class App.Models.Folder extends Backbone.Model

  urlRoot   : '/api/folders/'
  paramRoot : 'folder'

  defaults:
    name        : ''
    description : ''

  validation: # cf. https://github.com/thedersen/backbone.validation#built-in-validators
    name:
      required: true
      #pattern: /^[A-Z]/ # email, number, url, digits

class App.Collections.Folders extends Backbone.Collection
  model: App.Models.Folder
  url: '/api/folders'

  by_name: (name)->
    new App.Collections.Folders @where name: name, @options
