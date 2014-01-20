@BambooApp.module "DocsCommandsApp.List", (List, App, Backbone, Marionette, $, _) ->

  class List.Command extends App.Views.ItemView
    template: "docs_commands/list/_command"
    tagName: "tr"

  class List.Commands extends App.Views.CompositeView
    template: "docs_commands/list/commands"
    itemView: List.Command
    itemViewContainer: "tbody"

    onRender: ->
      $sideBar = @$('.bb-sidebar')

      $(document.body).scrollspy
        target:'.bb-sidebar'
        offet: $('.navbar').outerHeight(true) + 10

      $sideBar.affix
        offset:
          top: ->
            offsetTop = $sideBar.offset().top
            sideBarMargin = parseInt($sideBar.children(0).css('margin-top'), 10)
            navOuterHeight = $('.bb-navbar').height()
            (@top = offsetTop - navOuterHeight - sideBarMargin)
          bottom: ->
            (@bottom = $('.bb-footer').outerHeight(true))
  
  
