var mongoose, CaseDesign, Schema, modelName, collectionName, passwordHash;

mongoose = require('mongoose');
Schema = mongoose.Schema;

CaseDesign = Schema({
    name:           {type: String,  required:true, index:true},
    shared:         {type: Boolean, required:true},
    previewImage:   {type: Schema.Types.ObjectId, ref: 'CaseDesign'},
    caseModel:      {type: Schema.Types.ObjectId, ref: 'CaseModel'}
});

modelName = "CaseDesign";
collectionName = "CaseDesigns";
CaseDesign = mongoose.model(modelName, CaseDesign, collectionName);