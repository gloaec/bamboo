do (Marionette) ->
  _.extend Marionette.Renderer,

    render: (template, data) ->
      return if template is false
      path = @getTemplate(template)
      throw "Template #{template} not found!" unless path
      # JST:
      #path(data)
      path.call(data)

    getTemplate: (template) ->
      r = new RegExp template.replace(/\//g, '/.*')+'$'
      for k, f of JST
        return f if k.match r
