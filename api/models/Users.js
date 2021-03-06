/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt-nodejs');

module.exports = {
  connection: 'userMongodbServer',
  schema: true,
  attributes: {
    username: {
      type: 'string',
      unique: 'true',
      required: 'true'
    },
    password: {
      type: 'string',
      required: 'true',
      minLength: '6'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, null, function (error, hash) {
        if (error) {
          console.log(error);
        } else {
          user.password = hash;
        }
        cb();
      });
    });
  }
};
