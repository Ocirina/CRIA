// Include dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for Phone.
var Phone = Schema({
    type: {type: String, required: true, index: true},
});

// Define the Mongoose model.
mongoose.model("Phone", Phone, "Phones");