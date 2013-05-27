var mongoose, Car, Schema, modelName, collectionName;

/* Include dependencies */
mongoose = require('mongoose');
Schema = mongoose.Schema;

/**
 * Schema definition
 * This defines which attributes the Car model should have and other database
 * related stuff like validation and type etc.
 */
Car = Schema({
    brand: {type: String, required: true, index:true},
    type: {type: String, required: true, index:true},
    fuel: {type: String, required: true},
    capacity: {type: Number, required: true},
    power: {type: Number, required: true},
    year: {type: Number, required: true},
    colour: {type: String, required: true},
    image: {type: String, required: true},
    reservations: [{type: Schema.Types.ObjectId, ref: 'Reservation'}],
    price: {type: Number, required: true},
    sold: {type: Boolean, "default": false},
    soldOn: {type: Date}
});

/**
 * Removes all reservation that depend and are associated with the removed car.
 * @see http://mongoosejs.com/docs/middleware.html
 */
Car.pre('remove', function(next){
    Reservation.find({car: this._id}).remove();
    next();
});

/*
Set the name of the model and the plural naming convention.
Then define the mongoose model.
*/
modelName = "Car";
collectionName = "cars";
var Car = mongoose.model(modelName, Car, collectionName);

/**
 * Adds validation to year. If it's build from 1769 (see wikipedia) till the current
 * year (because you can't sell a car from the future).
 */
Car.schema.path('year').validate(function (value) {
    return value > 1769 && value <= new Date().getFullYear();
}, 'Incorrecte bouwjaar opgegeven!');




