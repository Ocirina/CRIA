// Include dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for Oder.
var Order = Schema({
    user:        {type: Schema.Types.ObjectId, ref: 'User', required: true},
    orderlines:  [{type: Schema.Types.ObjectId, ref: 'OrderLine'}],
    orderState:  {type: Schema.Types.ObjectId, ref: 'OrderState'}
});

Order.pre('save', function(next, req, order, callback){
  var orderlines = req.body.order.orderlines;
});

// Define the Mongoose model.
mongoose.model("Order", Order, "Orders");