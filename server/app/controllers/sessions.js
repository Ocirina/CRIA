// Include dependencies
var mongoose = require('mongoose');
var User = mongoose.model('User');


/**
 * Type: POST
 * Route: /user/signin
 */
exports.create = function (req, res) {
  User
    .findOne({name: req.body.username})
    .exec(function (err, user) {
      if (req.body.password === user.password) {
        req.session['username'] = user.name;
        req.session['lastAccess'] = new Date().getTime();
      } else {
        user = null;
        err = new Error("Wachtwoord en/of gebruikersnaam is incorrect.");
      }
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
  delete req.session.username
  delete req.session.lastAccess
}
