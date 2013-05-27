/**
* @author Willem van Lent (willemvanlent@live.nl)
* @copyright Copyright (c) 2013, HAN, Arnhem - All rights reserved
* @version 1.0.0
*/
var mongoose, Order, Schema, modelName, collectionName, passwordHash;

mongoose = require('mongoose');
Schema = mongoose.Schema;

Order = Schema({
    id:         {type: Number, required: true, index: true, unique: true},
    name:       {type: String, required: true, index: true},
    user:       {type: Schema.Types.ObjectId, ref: 'User', required: true},
    address:    {type: Schema.Types.ObjectId, ref: 'Address', required: true},
    orderState: {type: Schema.Types.ObjectId, ref: 'OrderState', required: true}
});

modelName = "Order";
collectionName = "orders";
Order = mongoose.model(modelName, Order, collectionName);