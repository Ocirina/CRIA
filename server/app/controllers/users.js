// Include dependencies
var mongoose = require('mongoose');
var User = mongoose.model('User');

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
  var conditions = {};
  var fields = {};
  var options = {'name': -1};

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
  User
    .findOne({_id: req.params.id}, '-password')
    .populate('Address')
    .exec(function (err, user) {
      return res.send({
        "error": err,
        "result": user
      });
    });
}

/**
 * Type: PUT
 * Route: /user/:id
 *
 * Note:
 * The delete on req.body._id is a fix for a Mongoose error.
 * The ID was send within the body and because it can't update an error 
 * is thrown.
 *
 * Note:
 * The reason for not using findOneAndUpdate() method is that the method doesn't
 * call the post/pre "save" middleware when executed. This conflicts with the
 * middleware that was specialy written to fix the creation of address.
 */
exports.update = function (req, res) {
  delete req.body._id; // See first note above.

  User.findOne({_id: req.params.id}) // See second note above.
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
