(function(Marionette) {
  return _.extend(Marionette.Renderer, {
    render: function(template, data) {
      var path;
      if (template === false) return;
      path = this.getTemplate(template);
      if (!path) throw "Template " + template + " not found!";
      return path.call(data);
    },
    getTemplate: function(template) {
      var f, k, r;
      r = new RegExp(template.replace(/\//g, '/.*') + '$');
      for (k in JST) {
        f = JST[k];
        if (k.match(r)) return f;
      }
    }
  });
})(Marionette);
