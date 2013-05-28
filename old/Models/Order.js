/**
 * @author Willem van Lent (willemvanlent@live.nl)
 * @copyright Copyright (c) 2013, HAN, Arnhem - All rights reserved
 * @version 1.0.0
 */
var Order = (function() {

    function Order(dataArray){
        this._orderLines = [];
        this._address = {};
        this._orderState = {};
    }

    Order.prototype.setOrderLines = function(orderLines) {
        this._orderLines = orderLines;
    };

    Order.prototype.getOrderLines = function() {
        return this._orderLines;
    };

    Order.prototype.setAddress = function(address) {
        this._address = address;
    };

    Order.prototype.getAddress = function() {
        return this._address;
    };

    Order.prototype.setOrderState = function(orderState) {
        this._orderState = orderState;
    };

    Order.prototype.getOrderState = function() {
        return this._orderState;
    };

    Order.prototype.purchase = function() {

    };

    Order.prototype.ship = function() {

    };

    Order.prototype.cancel = function() {

    };

    Order.prototype.resume = function() {

    };

    return Order;
})();