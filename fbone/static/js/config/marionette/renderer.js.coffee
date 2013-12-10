(function(Marionette) {
  return _.extend(Marionette.Renderer, {
    lookups: ["apps", "components", ""],
    render: function(template, data) {
      var path;
      if (template === false) return;
      path = this.getTemplate(template);
      if (!path) throw "Template " + template + " not found!";
      return path.call(data);
    },
    getTemplate: function(template) {
      var lookup, path, _i, _j, _len, _len2, _ref, _ref2;
      _ref = this.lookups;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        lookup = _ref[_i];
        _ref2 = [template, "js/" + lookup + template, this.withTemplate(lookup, template), this.withModuleTemplate(lookup, template)];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          path = _ref2[_j];
          if (JST[path]) return JST[path];
        }
      }
    },
    withTemplate: function(dir, string) {
      var array;
      array = string.split("/");
      array.splice(0, 0, "js/" + dir);
      array.splice(-1, 0, "templates");
      console.log(array.join("/"));
      return array.join("/");
    },
    withModuleTemplate: function(dir, string) {
      var array;
      array = string.split("/");
      array.splice(1, 0, "static/js/" + dir);
      array.splice(-1, 0, "templates");
      console.log(array.join("/"));
      return array.join("/");
    }
  });
})(Marionette);
