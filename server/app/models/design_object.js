// Include dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for DesignObject.
var DesignObject = Schema({
    width:      {type: Number, required: true},
    height:     {type: Number, required: true},
    degree:     {type: Number, required: true},
    xPosition:  {type: Number, required: true},
    yPosition:  {type: Number, required: true},
    zIndex:     {type: Number, required: true},
    image:      {type: Number, required: false},
    value:      {type: String, required: false},
    caseDesign: {type: Schema.Types.ObjectId, ref: 'CaseDesign'}
});

// Define the Mongoose model.
mongoose.model("DesignObject", DesignObject, "DesignObjects");