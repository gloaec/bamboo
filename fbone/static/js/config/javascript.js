Array.prototype.insertAt = function(index, item) {
  this.splice(index, 0, item);
  return this;
};

String.prototype.capitalizeFirst = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

_.mixin(_.str.exports());
