(function(Backbone) {
  var _navigate;
  _navigate = Backbone.history.navigate;
  return Backbone.history.navigate = function(fragment, options) {
    var navigate;
    navigate = _navigate.call(this, fragment, options);
    this.trigger('navigate', fragment, options);
    return navigate;
  };
})(Backbone);
