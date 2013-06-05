// Include dependencies
var mongoose = require('mongoose');
var Order = mongoose.model('Order');


/**
 * Type: POST
 * Route: /order
 */
exports.create = function (req, res) {
  var order = new Order({
    user: req.body.user
  });
  order.save(req, function (err) {
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
  Order.find({}, {}, {})
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
  Order
    .findOne({_id: req.params.id})
    .populate({
      path: 'orderlines',
      select: '-order'
    })
    .exec(function (err, order) {
      return res.send({
        "error": err,
        "result": order
      });
    });
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
