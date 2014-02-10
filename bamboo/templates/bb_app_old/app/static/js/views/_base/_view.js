this.BambooApp.module("Views", function(Views, App, Backbone, Marionette, $, _) {
  _.extend(Backbone.View.prototype, {
    validateit: function() {
      return Backbone.Validation.bind(this);
    },
    showErrors: function(errors) {
      var attr_name, msg, selector, _results,
        _this = this;
      this.$('.help-block').text('');
      this.$('.has-error').removeClass('has-error');
      if (errors != null) {
        _results = [];
        for (attr_name in errors) {
          msg = errors[attr_name];
          if (_.isArray(msg)) msg = msg.first();
          selector = Object.keys(this.bindings).find(function(selector) {
            return _this.bindings[selector] === attr_name;
          });
          if (selector != null) {
            this.$(selector).parent().addClass('has-error');
            _results.push(this.$(selector).next('.help-block').text(msg));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    }
  });
  return _.extend(Marionette.View.prototype, {
    templateHelpers: function() {}
  });
});
