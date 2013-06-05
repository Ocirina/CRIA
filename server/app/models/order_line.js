// Include dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for OderLine.
var OrderLine = Schema({
    caseDesign: {type: Schema.Types.ObjectId, ref: 'CaseDesign'},
    order:      {type: Schema.Types.ObjectId, ref: 'Order'},
});

// Define the Mongoose model.
mongoose.model("OrderLine", OrderLine, "OrderLines");