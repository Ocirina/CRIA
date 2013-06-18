// Include dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for CaseDesign.
var CaseDesign = Schema({
    name:           {type: String,  required: true, index: true},
    shared:         {type: Boolean, required: true},
    user:           {type: Schema.Types.ObjectId, ref: 'User'},
    preview:        {type: String, required: true},
    basicDesign:    {type: Schema.Types.ObjectId, ref: 'CaseDesign'},
    phone:          {type: String},
    case:           {type: String},
    canvas:         {type: String, required: true},
    created_at:     {type: Date, required: true, default: Date.now}
});

// Define the Mongoose model.
mongoose.model("CaseDesign", CaseDesign, "CaseDesigns");