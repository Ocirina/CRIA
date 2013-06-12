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
    //caseModel:      {type: Schema.Types.ObjectId, ref: 'CaseModel'},
    canvas:         {type: String, required: true},
    //designObjects:  [{type: Schema.Types.ObjectId, ref: 'DesignObject'}],
    created_at:     {type: Date, required: true, default: Date.now}
});

// Define the Mongoose model.
mongoose.model("CaseDesign", CaseDesign, "CaseDesigns");