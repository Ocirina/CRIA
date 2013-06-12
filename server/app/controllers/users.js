// Include dependencies
var mongoose = require('mongoose');
var User = mongoose.model('User');
var PasswordHash = require('password-hash');

/**
 * Checks if an address object has been posted with the user.
 * If so then it sets the user ID on the address object and returns it.
 * @param {Object} body The body of the request.
 * @param {Object} user The user from which the ID must be set.
 * @return {Object} Body of the request.
 */
function setIdForAddress(body, user) {
  if (body.hasOwnProperty('address')) { // TODO: Idiotic code won't work with PUT if check is added for address._id
    if (typeof body.address._id === "undefined") {
      body.address['user'] = user._id;
    }
  }
  return body;
}

/**
 * Type: POST
 * Route: /users
 */
exports.create = function (req, res) {
  var user = new User(req.body);
  req.body.password = PasswordHash.generate(req.body.password || "default");
  req.body = setIdForAddress(req.body, user);
  user.save(req, function (err) {
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
    .populate({
      path: 'address',
      select: '-user -__v'
    })
    .exec(function (err, user) {
      return res.send({
        "error": err,
        "result": user
      });
    });
}

/**
 * Type: GET
 * Route: /gallery/:id
 */
exports.gallery = function (req, res) {
  User
    .findOne({_id: req.params.id}, '-password')
    .populate({
      path: 'caseDesigns',
      select: '-designObjects'
    })
    .exec(function (err, user) {
      console.log(user, user.caseDesigns);
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
          user = setNewUserValues(user, req.body);
          req.body = setIdForAddress(req.body, user);
          user.save(req, function(err) {
            return res.send({
              "error": err,
              "result": user
            });
          });
        }
        else {
          return res.send({
            "error": err,
            "result": null
          });
        }
      });
  
  /**
   * Updates the fields for the user object.
   * @param {Object} user The user from which the ID must be set.
   * @param {Object} body The body of the request.
   * @return {Object} User object.
   */
  function setNewUserValues(user, body) {
    user.email = body.email;
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    return user;
  }
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
