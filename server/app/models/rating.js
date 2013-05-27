var mongoose, Rating, Schema, modelName, collectionName;

mongoose = require('mongoose');
Schema = mongoose.Schema;

Rating = Schema({
    amount:       {type: Number, required: true},
    minRating:    {type: Number, required: true},
    maxRating:    {type: Number, required: true},
    user:         {type: Schema.Types.ObjectId, ref: 'User', required: true},
    caseDesign:   {type: Schema.Types.ObjectId, ref: 'CaseDesign', required: true}
});

modelName = "Rating";
collectionName = "Ratings";
Rating = mongoose.model(modelName, Rating, collectionName);