// Include dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for Oder.
var Order = Schema({
    id:         {type: Number, required: true, index: true, unique: true},
    name:       {type: String, required: true, index: true},
    user:       {type: Schema.Types.ObjectId, ref: 'User', required: true},
    address:    {type: Schema.Types.ObjectId, ref: 'Address', required: true},
    orderState: {type: Schema.Types.ObjectId, ref: 'OrderState', required: true}
});

// Define the Mongoose model.
mongoose.model("Order", Order, "Orders");