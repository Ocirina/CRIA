// Include dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for OderLine.
var OderLine = Schema({
    caseDesign: {type: Schema.Types.ObjectId, ref: 'CaseDesign'},
    order:      {type: Schema.Types.ObjectId, ref: 'Oder'},
});

// Define the Mongoose model.
mongoose.model("OderLine", OderLine, "OderLines");