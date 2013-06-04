var mongoose, User, PasswordHasher;

/* Include dependencies */
mongoose = require('mongoose');
User = mongoose.model('User');

/**
 * Type: POST
 * Route: /users
 */
exports.create = function (req, res) {
  var user = new User(req.body);
  req.body.address.user = user._id;
  user.save(req, user, function (err) {
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
  delete req.body._id

  User.findOne({_id: req.params.id})
      .exec(function(err, user){
        if (!err) {
          user.email = req.body.email;
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          
          req.body.address.user = user._id;
          
          user.save(req, user, function(err) {
            return res.send({
              "error": err,
              "result": user
            });
          });
        }
      });
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
