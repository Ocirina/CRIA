var mongoose, Comment, Schema, modelName, collectionName, passwordHash;

mongoose = require('mongoose');
Schema = mongoose.Schema;

Comment = Schema({
    comment:      {type:String, required: true},
    user:         {type:Schema.Types.ObjectId, ref: 'User', required:true},
    caseDesign:   {type:Schema.Types.ObjectId, ref: 'CaseDesign', required:true}
});

modelName = "Comment";
collectionName = "comments";
Comment = mongoose.model(modelName, Comment, collectionName);