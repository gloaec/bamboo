@BambooApp.module "DashboardApp.Show", (Show, App, Backbone, Marionette, $, _) ->

	class Show.Layout extends App.Views.Layout
		template: "movies/dashboard/show/show_layout"

		regions:
			upcomingRegion: "#upcoming-region"
			theatreRegion: 	"#theatre-region"
