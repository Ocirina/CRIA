var mongoose, Phone, Schema, modelName, collectionName, passwordHash;

mongoose = require('mongoose');
Schema = mongoose.Schema;

Phone = Schema({
    type: {type: String, required: true, index: true},
});

modelName = "Phone";
collectionName = "Phones";
Phone = mongoose.model(modelName, Phone, collectionName);