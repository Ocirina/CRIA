var mongoose, User, Schema, modelName, collectionName;

mongoose = require('mongoose');
Schema = mongoose.Schema;

OderLine = Schema({
    caseDesign: {type: Schema.Types.ObjectId, ref: 'CaseDesign'},
    oder:       {type: Schema.Types.ObjectId, ref: 'Oder'},
});

modelName = "OderLine";
collectionName = "OderLines";
User = mongoose.model(modelName, OderLine, collectionName);