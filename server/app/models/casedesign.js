var mongoose, CaseDesign, Schema, modelName, collectionName, passwordHash;

mongoose = require('mongoose');
Schema = mongoose.Schema;

CaseDesign = Schema({
    name:           {type:String, required:true, index:true},
    previewImage:   {type:Schema.Types.ObjectId, ref: 'caseDesign'},
    shared:         {type:Bool, required:true}
});

modelName = "CaseDesign";
collectionName = "casedesign";
CaseDesign = mongoose.model(modelName, CaseDesign, collectionName);