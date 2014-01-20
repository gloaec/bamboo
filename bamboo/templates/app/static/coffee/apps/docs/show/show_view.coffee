@BambooApp.module "DocsApp.Show", (Show, App, Backbone, Marionette, $, _) ->

  class Show.Layout extends App.Views.Layout
    template: "docs/show/show_layout"

    regions:
      tabsRegion     : "#tabs-region"
      contentsRegion : "#contents-region"
	
  class Show.Tabs extends App.Views.ItemView
    template: "docs/show/_tabs"
		
    events:
      "click a" : "tabClicked"

		tabClicked: (e) ->
			e.preventDefault()
			@trigger "tab:clicked", e.target

  class Show.Hero extends App.Views.ItemView
    template: "docs/show/_hero"
