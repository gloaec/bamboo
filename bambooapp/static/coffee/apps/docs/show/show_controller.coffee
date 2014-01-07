@BambooApp.module "DocsApp.Show", (Show, App, Backbone, Marionette, $, _) ->

  class Show.Controller extends App.Controllers.Base

    initialize: ->
      @layout = @getLayoutView()

      @listenTo @layout, "show", =>
        @tabsView()

    listCommands: ->
      @show @layout unless @_mainView
      App.execute "list:docs:commands", @layout.contentsRegion

    showGetStarted: ->
      @show @layout unless @_mainView
      App.execute "show:docs:getstarted", @layout.contentsRegion
		
    tabsView: ->
      tabsView = @getTabsView()
			
      @listenTo tabsView, "tab:clicked", (tab) =>
        console.log 'tab clicked', tab
			
      @show tabsView, region: @layout.tabsRegion
		
    getTabsView: ->
      new Show.Tabs

    getLayoutView: ->
      new Show.Layout
