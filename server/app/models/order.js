// Include dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for Oder.
var Order = Schema({
    user:        {type: Schema.Types.ObjectId, ref: 'User', required: true},
    orderlines:  [{type: Schema.Types.ObjectId, ref: 'OrderLine'}]
    //,orderState:  {type: Schema.Types.ObjectId, ref: 'OrderState'}
});

/**
 * Before saving it creates the orderlines send with the order.
 * I've chosen for a middleware function to keep the controllers more clean.
 * @see http://mongoosejs.com/docs/middleware.html
 *
 * Note:
 * I found a problem which wasn't described in the documentation online.
 * The documentation doesn't say a thing about executing the callback given
 * with the save method. This method must be executed manually within the middleware.
 * Found the solution with this url: https://github.com/LearnBoost/mongoose/issues/499
 *
 * Note:
 * The reference to this is to the Order instance which will be saved.
 * This wasn't documented and solution was found here: http://stackoverflow.com/a/14774743/1988125
 */
Order.pre('save', function(next, req, callback){
  console.log('PRE SAVE');
  var order = this; // See second note above.
  if (typeof req != "undefined" || req != null) {
    createOrderlines(req.orderlines, order, next, callback);
  }
  else { next(callback); }
  
  /**
   * Loops throught the orderlines and calls the createOrder method.
   * @param {Array} orderlines An array of orderlines objects from the request.
   * @param {Object} order Reference to the order instance
   * @param {Function} cb Callback to execute on save of an orderline. 
   */
  function createOrderlines(orderlines, order, next, callback) {
    for (var index in orderlines) {
      createOrderline(orderlines[index], order, next, callback);
    }
  }
  
  /**
   * Creates the OrderLine object from the Mongoose models.
   * It also associates the orderline with order and executes the callback on save.
   * @param {Array} orderlines An array of orderlines objects from the request.
   * @param {Object} order Reference to the order instance
   * @param {Function} cb Callback to execute on save of an orderline. 
   */
  function createOrderline(orderline, order, next, callback) {
    var OrderLine = mongoose.models["OrderLine"];
    var line = new OrderLine(orderline);
    line.order = order._id;
    line.save(function(err, line) {
      if (!err) { 
        order.orderlines.push(line._id);
        next(callback);
      }
      else { next(err); }
    });
  }
});

/*
Order.post('save', function(order){
  console.log('POST SAVE');
  var OrderLine = mongoose.models["OrderLine"];
  OrderLine
    .find({order: order._id})
    .exec(function(err, orderlines){
      order.orderlines = [];
      console.log("1", order);
      for (var index in orderlines) {
        order.orderlines.push(orderlines[index]._id);
      }
      console.log("2", order);
      order.save();
    });
});
*/

// Define the Mongoose model.
mongoose.model("Order", Order, "Orders");