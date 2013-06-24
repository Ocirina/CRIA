/**
 * @author Willem van Lent (willemvanlent@live.nl)
 * @copyright Copyright (c) 2013, HAN, Arnhem - All rights reserved
 * @version 1.0.0
 */
var Rating = (function() {

    function Rating(dataArray){
        this._amount = 0;
    }

    Rating.prototype.minRating = 0;

    Rating.prototype.maxRating = 5;

    Rating.prototype.setAmount = function(amount) {
        this._amount = amount;
    };

    Rating.prototype.validateAmount = function() {
        return this._amount;
    };

    Rating.prototype.getMinRating = function() {
        return this.prototype.minRating;
    };

    Rating.prototype.getMaxRating = function() {
        return this.prototype.maxRating;
    };

    return Rating;
})();