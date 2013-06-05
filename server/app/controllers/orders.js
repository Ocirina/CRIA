// Include dependencies
var mongoose = require('mongoose');
var Order = mongoose.model('Order');


/**
 * Type: POST
 * Route: /order
 */
exports.create = function (req, res) {
  var order = new Order(req.body);
  order.save(function (err) {
    return res.send({
      "error":  err,
      "result": order
    });
  });
}

/**
 * Type: GET
 * Route: /orders
 */
exports.index = function (req, res) {
  var conditions, fields, options;

  conditions = {};
  fields = {};
  options = {'name': -1};

  Order.find(conditions, fields, options)
      .exec(function (err, orders) {
        return res.send({
          "error": err,
          "result": orders
        });
      });
}

/**
 * Type: GET
 * Route: /order/:id
 */
exports.show = function (req, res) {
  var id = req.params.id;
  
  Order
    .findOne({_id: id})
    .exec(function (err, order) {
      return res.send({
        "error": err,
        "result": order
      });
    });
}

/**
 * Type: PUT
 * Route: /order/:id
 */
exports.update = function (req, res) {
  var conditions = {_id: req.params.id},
      update = req.body,
      options = { multi: true },
      callback = function (err, order) {
        return res.send({
          "error": err,
          "result": order
        });
      };
  Order.findOneAndUpdate(conditions, update, options, callback);
}

/**
 * Type: DELETE
 * Route: /order/:id
 */
exports.destroy = function (req, res) {
  Order.findByIdAndRemove(req.params.id, function (err, doc) {
    return res.send({
      "error": err,
      "result": (err ? false : true)
    });
  });
}
