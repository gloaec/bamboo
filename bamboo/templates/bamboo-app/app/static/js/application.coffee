window.App = new Backbone.Marionette.Application

App.module 'Models'
App.module 'Collections'
App.module 'Views'
App.module 'Controllers'
App.module 'Routers'

App.redirectHashBang = ->
  window.location = window.location.hash.substring(2)

App.addInitializer ->
  @addRegions mainRegion: '#main-content'

  @router = new @Routers.Main(controller: new @Controllers.Main)

  @mainRegion.onShow = (view)->
    for flash in App.flashes
      flash.slideDown().alert()
      console.log 'flash', @$el, flash
      view.$el.prepend flash
    App.flashes = []

  $(document).on 'click', "a[href^='/']", (e)->
    href = $(@).attr('href')
    passThrough = href.indexOf('special_url') >= 0 or $(@).data('reload')?
    if !passThrough and !e.altKey and !e.ctrlKey and !e.metaKey and !e.shiftKey
      e.preventDefault()
      url = href.replace(/^\//,'').replace('\#\!\/','')
      App.router.navigate url, { trigger: true }
      $('ul.nav > li').removeClass('active').find('a').each ->
        link = $(@).attr('href')
        if (new RegExp(link)).test(href) and link != '/' or href == link == '/'
          $(@).parent('li').addClass('active')
      false

App.on 'initialize:after', ->
  Backbone.history.start pushState:true if Backbone.history?

$ ->
  console.log 'App Start...', App
  if window.location.hash.indexOf('!') > -1
    App.redirectHashBang()
  else
    App.start()
