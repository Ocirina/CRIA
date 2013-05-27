var mongoose, User, Schema, modelName, collectionName, passwordHash;

mongoose = require('mongoose');
Schema = mongoose.Schema;

User = Schema({
    name:         {type:String, required:true, index:true, unique:true},
    email:        {type:String, required:true, index:true, unique:true},
    firstName:    {type:String, required:true},
    lastName:     {type:String, required:true},
    dateOfBirth:  {type: Date,  required:true},
    password:     {type:String, required:true},
});

modelName = "User";
collectionName = "users";
User = mongoose.model(modelName, User, collectionName);