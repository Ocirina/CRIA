/**
 * @author Willem van Lent (willemvanlent@live.nl)
 * @copyright Copyright (c) 2013, HAN, Arnhem - All rights reserved
 * @version 1.0.0
 */
var OrderLine = (function() {

    function OrderLine(dataArray){
        this._products = [];
    }

    OrderLine.prototype.setProducts = function(products) {
        this._products = products;
    };

    OrderLine.prototype.getProducts = function() {
        return this._products;
    };

    return OrderLine;
})();