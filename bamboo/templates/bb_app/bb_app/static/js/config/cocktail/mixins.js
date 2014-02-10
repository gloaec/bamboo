(function(Backbone, Cocktail) {
  var ManySelectable, OneSelectable, Selectable;
  Backbone.Model.prototype = Backbone.AssociatedModel.prototype;
  Cocktail.patch(Backbone);
  _.extend(Backbone.actAs.Mementoable, {
    store: function() {
      return this.storeMemento.apply(this, arguments);
    },
    restore: function() {
      return this.restoreMemento.apply(this, arguments);
    }
  });
  Selectable = {
    initialize: function() {
      return _.extend(this, new Backbone.Picky.Selectable(this));
    }
  };
  OneSelectable = {
    initialize: function() {
      return _.extend(this, new Backbone.Picky.SingleSelectable(this));
    }
  };
  ManySelectable = {
    initialize: function() {
      return _.extend(this, new Backbone.Picky.MutliSelectable(this));
    }
  };
  return Cocktail.mixins = {
    associable: {},
    selectable: Selectable,
    one_selectable: OneSelectable,
    many_selectable: ManySelectable,
    storable: Backbone.actAs.Mementoable,
    validable: Backbone.Validation.mixin
  };
})(Backbone, Cocktail);
