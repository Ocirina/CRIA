var mongoose, Car;

/* Include dependencies */
mongoose = require('mongoose');
User = mongoose.model('User');


/**
 * Type: POST
 * Route: /users
 */
exports.create = function (req, res) {
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
  var conditions = {_id: req.params.id},
      update = req.body,
      options = { multi: true },
      callback = function (err, user) {
        return res.send({
          "error": err,
          "result": user
        });
      };
  Car.findOneAndUpdate(conditions, update, options, callback);
}

/**
 * Type: DELETE
 * Route: /user/:id
 */
exports.destroy = function (req, res) {
  Car.findByIdAndRemove(req.params.id, function (err, doc) {
    return res.send({
      "error": err,
      "result": (err ? false : true)
    });
  });
}
