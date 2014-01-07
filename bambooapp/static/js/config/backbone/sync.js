(function(Backbone) {
  var _sync;
  _sync = Backbone.sync;
  return Backbone.sync = function(method, entity, options) {
    var sync;
    if (options == null) options = {};
    sync = _sync(method, entity, options);
    if (!entity._fetch && method === "read") entity._fetch = sync;
    return sync;
  };
})(Backbone);
