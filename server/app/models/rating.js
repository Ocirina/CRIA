// Include dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for Rating.
var Rating = Schema({
    amount:       {type: Number, required: true, min: 1, max: 5},
    user:         {type: Schema.Types.ObjectId, ref: 'User', required: true},
    caseDesign:   {type: Schema.Types.ObjectId, ref: 'CaseDesign', required: true}
});

// Make sure it only has 1 rating per design.
Rating.index({user: 1, caseDesign: 1}, {unique: true});

// Define the Mongoose model.
mongoose.model("Rating", Rating, "Ratings");