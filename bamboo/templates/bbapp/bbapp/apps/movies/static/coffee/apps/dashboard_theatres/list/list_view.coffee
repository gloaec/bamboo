@BambooApp.module "DashboardTheatresApp.List", (List, App, Backbone, Marionette, $, _) ->

	class List.Theatre extends App.Views.ItemView
		template: "movies/dashboard_theatres/list/_theatre"
		tagName: "tr"

	class List.Theatres extends App.Views.CompositeView
		template: "movies/dashboard_theatres/list/theatres"
		itemView: List.Theatre
		itemViewContainer: "tbody"
