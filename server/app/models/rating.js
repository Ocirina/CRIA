var mongoose, Rating, Schema, modelName, collectionName, passwordHash;

mongoose = require('mongoose');
Schema = mongoose.Schema;

Rating = Schema({
    amount:       {type:Number, required:true},
    minRating:    {type:Number, required:true},
    maxRating:    {type:Number, required:true}
    /* Relations to be added */
});

modelName = "Rating";
collectionName = "ratings";
Rating = mongoose.model(modelName, Rating, collectionName);