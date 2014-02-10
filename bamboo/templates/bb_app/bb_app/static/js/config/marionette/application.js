(function(Backbone) {
  return _.extend(Backbone.Marionette.Application.prototype, {
    navigate: function(route, options) {
      if (options == null) options = {};
      this.vent.trigger('navigate', route, options);
      return Backbone.history.navigate(route, options);
    },
    getCurrentRoute: function() {
      var frag;
      frag = Backbone.history.fragment;
      if (_.isEmpty(frag)) {
        return null;
      } else {
        return frag;
      }
    },
    startHistory: function(options) {
      if (options == null) options = {};
      _.defaults(options, {
        pushState: true
      });
      if (Backbone.history) {
        Backbone.history.start(options);
        if (Backbone.history._hasPushState) {
          return $(document).delegate("a[href^='/']", "click", this.delegateClick);
        }
      }
    },
    delegateClick: function(event) {
      var href, passThrough, protocol;
      event = event || window.event;
      href = $(this).attr("href");
      protocol = this.protocol + "//";
      passThrough = href.indexOf('special_url') >= 0 || ($(this).data('reload') != null);
      passThrough || (passThrough = href.slice(protocol.length) === protocol);
      passThrough || (passThrough = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
      if (!passThrough) {
        event.preventDefault();
        $('li.active').removeClass('active');
        $('a').each(function(i, el) {
          if (href.match($(el).attr('href'))) {
            return $(el).parent('li').addClass('active');
          }
        });
        Backbone.history.navigate(href, true);
        return false;
      }
    },
    register: function(instance, id) {
      if (this._registry == null) this._registry = {};
      return this._registry[id] = instance;
    },
    unregister: function(instance, id) {
      return delete this._registry[id];
    },
    resetRegistry: function() {
      var controller, key, msg, oldCount, _ref;
      oldCount = this.getRegistrySize();
      _ref = this._registry;
      for (key in _ref) {
        controller = _ref[key];
        controller.region.close();
      }
      msg = "There were " + oldCount + " controllers in the registry, there are now " + (this.getRegistrySize());
      if (this.getRegistrySize() > 0) {
        return console.warn(msg, this._registry);
      } else {
        return console.log(msg);
      }
    },
    getRegistrySize: function() {
      return _.size(this._registry);
    }
  });
})(Backbone);
