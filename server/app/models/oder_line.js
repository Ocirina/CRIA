var mongoose, User, Schema, modelName, collectionName;

mongoose = require('mongoose');
Schema = mongoose.Schema;

OderLine = Schema({
    caseDesign: {type: Schema.Type.ObjectId, ref: 'CaseDesign'},
    oder:       {type: Schema.Type.ObjectId, ref: 'Oder'},
});

modelName = "OderLine";
collectionName = "OderLines";
User = mongoose.model(modelName, OderLine, collectionName);