// Include dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for CaseModel.
var CaseModel = Schema({
    name:   {type: String, required: true, index: true},
    type:   {type: String, required: true, index: true},
    colors: {type: Array}
});

// Define the Mongoose model.
mongoose.model("CaseModel", CaseModel, "CaseModels");