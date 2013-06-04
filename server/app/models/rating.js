// Include dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for Rating.
var Rating = Schema({
    amount:       {type: Number, required: true},
    user:         {type: Schema.Types.ObjectId, ref: 'User', required: true},
    caseDesign:   {type: Schema.Types.ObjectId, ref: 'CaseDesign', required: true}
});

// Define the Mongoose model.
mongoose.model("Rating", Rating, "Ratings");