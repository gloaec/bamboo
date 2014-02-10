var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("DocsCommandsApp.List", function(List, App, Backbone, Marionette, $, _) {
  List.Command = (function(_super) {

    __extends(Command, _super);

    function Command() {
      Command.__super__.constructor.apply(this, arguments);
    }

    Command.prototype.template = "docs_commands/list/_command";

    Command.prototype.tagName = "tr";

    return Command;

  })(App.Views.ItemView);
  return List.Commands = (function(_super) {

    __extends(Commands, _super);

    function Commands() {
      Commands.__super__.constructor.apply(this, arguments);
    }

    Commands.prototype.template = "docs_commands/list/commands";

    Commands.prototype.itemView = List.Command;

    Commands.prototype.itemViewContainer = "tbody";

    Commands.prototype.onRender = function() {
      var $sideBar;
      $sideBar = this.$('.bb-sidebar');
      $(document.body).scrollspy({
        target: '.bb-sidebar',
        offet: $('.navbar').outerHeight(true) + 10
      });
      return $sideBar.affix({
        offset: {
          top: function() {
            var navOuterHeight, offsetTop, sideBarMargin;
            offsetTop = $sideBar.offset().top;
            sideBarMargin = parseInt($sideBar.children(0).css('margin-top'), 10);
            navOuterHeight = $('.bb-navbar').height();
            return this.top = offsetTop - navOuterHeight - sideBarMargin;
          },
          bottom: function() {
            return this.bottom = $('.bb-footer').outerHeight(true);
          }
        }
      });
    };

    return Commands;

  })(App.Views.CompositeView);
});
