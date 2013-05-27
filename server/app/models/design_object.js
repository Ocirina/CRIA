var mongoose, DesignObject, Schema, modelName, collectionName, passwordHash;

mongoose = require('mongoose');
Schema = mongoose.Schema;

DesignObject = Schema({
    width:      {type: Number, required: true},
    height:     {type: Number, required: true},
    degree:     {type: Number, required: true},
    xPosition:  {type: Number, required: true},
    yPosition:  {type: Number, required: true},
    zIndex:     {type: Number, required: true},
    image:      {type: Number, required: false},
    value:      {type: String, required: false},
    caseDesign: {type: Schema.Types.ObjectId, ref: 'CaseDesign'}
});

modelName = "DesignObject";
collectionName = "DesignObjects";
DesignObjects = mongoose.model(modelName, DesignObject, collectionName);