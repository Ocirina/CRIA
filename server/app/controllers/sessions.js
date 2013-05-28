var mongoose, User, PasswordHasher;

/* Include dependencies */
mongoose = require('mongoose');
User = mongoose.model('User');
PasswordHasher = require('password-hash');


/**
 * Type: POST
 * Route: /user/signin
 */
exports.create = function (req, res) {
  req.body.password = PasswordHasher.generate(req.body.password);
  // Create session with user password.
  User
    .findOne({
      name: req.body.username,
      password: req.body.password
    })
    .exec(function (err, user) {
      delete user.password;
      // TODO: start session
      req.session.username = user.name;
      req.session.lastAccess = new Date().getTime();
      return res.send({
        "error": err,
        "result": user
      });
    });
}

/**
 * Type: POST
 * Route: /user/check
 */
exports.check = function (req, res) {
  var result = {"error": "Not signed in!", "result": false};
  if (req.session.username === res.body.username) {
    req.session.lastAccess = new Date().getTime();
    result.error = null;
    result.result = true;
  }
  res.send(result);
}

/**
 * Type: DELETE
 * Route: /user/signout
 */
exports.destroy = function (req, res) {
  // TODO: Destroy session.
  req.session = {}; // Possible?
}
