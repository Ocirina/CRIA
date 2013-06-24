/**
 * @author Willem van Lent (willemvanlent@live.nl)
 * @copyright Copyright (c) 2013, HAN, Arnhem - All rights reserved
 * @version 1.0.0
 */
var Price = (function() {

    function Price(dataArray){
        this._amount = 0;
        this._startDate = 0;
        this._endDate = 0;
    }

    Price.prototype.setAmount = function(amount) {
        this._amount = amount;
    };

    Price.prototype.validateAmount = function() {
        return this._amount;
    };

    Price.prototype.setStartDate = function(startDate) {
        this._startDate = startDate;
    };

    Price.prototype.getStartDate = function() {
        return this._startDate;
    };

    Price.prototype.setEndDate = function(endDate) {
        this._endDate = endDate;
    };

    Price.prototype.getEndDate = function() {
        return this._endDate;
    };

    return Price;
})();