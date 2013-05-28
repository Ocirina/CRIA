var mongoose, User, PasswordHasher;

/* Include dependencies */
mongoose = require('mongoose');
User = mongoose.model('User');
PasswordHasher = require('password-hash');

/**
 * Type: POST
 * Route: /users
 */
exports.create = function (req, res) {
  req.body.password = PasswordHasher.generate(req.body.password);
  var user = new User(req.body);
  user.save(function (err) {
    return res.send({
      "error":  err,
      "result": user
    });
  });
}

/**
 * Type: GET
 * Route: /users
 */
exports.index = function (req, res) {
  var conditions, fields, options;

  conditions = {};
  fields = {};
  options = {'name': -1};

  User.find(conditions, fields, options)
      .exec(function (err, users) {
        return res.send({
          "error": err,
          "result": users
        });
      });
}

/**
 * Type: GET
 * Route: /user/:id
 */
exports.show = function (req, res) {
  var id = req.params.id;
  
  User
    .findOne({_id: id})
    .exec(function (err, user) {
      delete user.password;
      return res.send({
        "error": err,
        "result": user
      });
    });
}

/**
 * Type: PUT
 * Route: /user/:id
 */
exports.update = function (req, res) {
  req.body.password = PasswordHasher.generate(req.body.password);
  var conditions = {_id: req.params.id},
      update = req.body,
      options = { multi: true },
      callback = function (err, user) {
        return res.send({
          "error": err,
          "result": user
        });
      };
  User.findOneAndUpdate(conditions, update, options, callback);
}

/**
 * Type: DELETE
 * Route: /user/:id
 */
exports.destroy = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, doc) {
    return res.send({
      "error": err,
      "result": (err ? false : true)
    });
  });
}
