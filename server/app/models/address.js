var mongoose, Address, Schema, modelName, collectionName, passwordHash;

mongoose = require('mongoose');
Schema = mongoose.Schema;

Address = Schema({
    street:       {type:String, required:true},
    houseNumber:  {type:String, required:true},
    postalCode:   {type:String, required:true, index:true, unique:true},
    place:        {type:String, required:true},
    country:      {type:String, required:true},
    province:     {type:String, required:true},
});

modelName = "Address";
collectionName = "addresses";
User = mongoose.model(modelName, Address, collectionName);