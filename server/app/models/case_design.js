// Include dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for CaseDesign.
var CaseDesign = Schema({
    name:           {type: String,  required: true, index: true},
    shared:         {type: Boolean, required: true},
    user:           {type: Schema.Types.ObjectId, ref: 'User'},
    previewImage:   {type: Schema.Types.ObjectId, ref: 'CaseDesign'},
    caseModel:      {type: Schema.Types.ObjectId, ref: 'CaseModel'}
});

// Define the Mongoose model.
mongoose.model("CaseDesign", CaseDesign, "CaseDesigns");