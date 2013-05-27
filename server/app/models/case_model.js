var mongoose, CaseModel, Schema, modelName, collectionName, passwordHash;

mongoose = require('mongoose');
Schema = mongoose.Schema;

CaseModel = Schema({
  name:   {type: String, required: true, index: true},
  type:   {type: String, required: true, index: true},
  colors: {type: Array}
});

modelName = "CaseModel";
collectionName = "CaseModels";
Phone = mongoose.model(modelName, CaseModel, collectionName);