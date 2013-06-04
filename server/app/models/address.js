// Include dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for Address.
var Address = Schema({
    user:         {type: Schema.Types.ObjectId, ref: 'User', index: true},
    street:       {type: String, required: true},
    houseNumber:  {type: String, required: true},
    postalCode:   {type: String, required: true, index: true, unique: true},
    city:         {type: String, required: true}
});

// Define the Mongoose model.
mongoose.model("Address", Address, "Addresses");