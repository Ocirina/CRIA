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
      return res.send({
        "error": err,
        "result": user
      });
    });
}

/**
 * Type: DELETE
 * Route: /user/signout
 */
exports.destroy = function (req, res) {
  // TODO: Destroy session.
}
