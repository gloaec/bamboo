@BambooApp.module "Views", (Views, App, Backbone, Marionette, $, _) ->

  class Views.Layout extends Marionette.Layout
    className: 'container'
