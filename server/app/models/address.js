var mongoose, Address, Schema, modelName, collectionName;

mongoose = require('mongoose');
Schema = mongoose.Schema;

Address = Schema({
    user:         {type: Schema.Types.ObjectId, ref: 'User'},
    street:       {type:String, required:true},
    houseNumber:  {type:String, required:true},
    postalCode:   {type:String, required:true, index:true, unique:true},
    city:         {type:String, required:true}
});

modelName = "Address";
collectionName = "Addresses";
User = mongoose.model(modelName, Address, collectionName);