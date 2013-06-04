// Include dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for User.
var User = Schema({
    name:         {type: String, required: true, index: true, unique: true},
    email:        {type: String, required: true, index: true, unique: true},
    firstName:    {type: String, required: true},
    lastName:     {type: String, required: true},
    dateOfBirth:  {type: Date,   required: true},
    password:     {type: String, required: true},
});

/**
 * Before saving it checks if there is a address POST-ed with the request. If
 * this is true then it will save the address to the database.
 * I've chosen for a middleware function to keep the controllers more clean.
 * @see http://mongoosejs.com/docs/middleware.html
 */
User.pre('save', function(next, req, user, callback){
  if (req.body['address']) {
    var Address = mongoose.models["Address"];
    var item = new Address(req.body.address);
    item.save(function(err, addr){
      if (!err) {next(callback);}
      else {next(err);}
    });
  }
});

// Define the Mongoose model.
mongoose.model("User", User, "Users");