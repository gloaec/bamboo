var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.BambooApp.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  var API;
  Entities.User = (function(_super) {

    __extends(User, _super);

    function User() {
      User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.urlRoot = function() {
      return "/api/users";
    };

    return User;

  })(Entities.Model);
  Entities.UsersCollection = (function(_super) {

    __extends(UsersCollection, _super);

    function UsersCollection() {
      UsersCollection.__super__.constructor.apply(this, arguments);
    }

    UsersCollection.prototype.model = Entities.User;

    UsersCollection.prototype.url = function() {
      return "/api/users";
    };

    return UsersCollection;

  })(Entities.Collection);
  API = {
    getUsers: function() {
      var users;
      users = new Entities.UsersCollection;
      users.fetch();
      return users;
    },
    getUser: function(id) {
      var user;
      user = new Entities.User({
        id: id
      });
      user.fetch();
      return user;
    }
  };
  App.reqres.setHandler("user:entities", function() {
    return API.getUsers();
  });
  return App.reqres.setHandler("user:entity", function(id) {
    return API.getUser(id);
  });
});
