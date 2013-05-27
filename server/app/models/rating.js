var mongoose, Rating, Schema, modelName, collectionName, passwordHash;

mongoose = require('mongoose');
Schema = mongoose.Schema;

Rating = Schema({
    amount:       {type:Number, required:true},
    minRating:    {type:Number, required:true},
    maxRating:    {type:Number, required:true},
    user:         {type:Schema.Types.ObjectId, ref: 'User'},
    caseDesign:   {type:Schema.Types.ObjectId, ref: 'CaseDesign'}
});

modelName = "Rating";
collectionName = "ratings";
Rating = mongoose.model(modelName, Rating, collectionName);