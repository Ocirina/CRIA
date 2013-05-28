/**
 * @author Willem van Lent (willemvanlent@live.nl)
 * @copyright Copyright (c) 2013, HAN, Arnhem - All rights reserved
 * @version 1.0.0
 */

var Phone = (function() {

    function Phone(){
        this._type = "";
    }

    Phone.prototype.availableTypes = new Enum('IPHONE4,IPHONE5');

    Phone.prototype.getAvailableTypes = function() {
        return this.prototype.availableTypes;
    };

    Phone.prototype.setType = function(type) {
        this._type = type;
    };

    Phone.prototype.getType = function() {
        return this._type;
    };

    return Phone;
})();