class App.module('Views').Commands extends Backbone.Marionette.Layout
  
  template: 'commands'

  onRender: ->

    $sideBar = @$('.bb-sidebar')

    @$("[role='complementary']").affix
      offset:
        #top: ->
        #  @top = $('#content').outerHeight(true)
        top: ->
          offsetTop = $sideBar.offset().top
          sideBarMargin = parseInt($sideBar.children(0).css('margin-top'), 10)
          navOuterHeight = $('.bb-navbar').height()
          (@top = offsetTop - navOuterHeight - sideBarMargin)
        bottom: ->
          (@bottom = $('.bb-footer').outerHeight(true))


