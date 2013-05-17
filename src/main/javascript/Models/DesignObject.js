/**
 * @author Willem van Lent (willemvanlent@live.nl)
 * @copyright Copyright (c) 2013, HAN, Arnhem - All rights reserved
 * @version 1.0.0
 */
var DesignObject = (function() {

    function DesignObject(dataArray){
        this._width = 0;
        this._height = 0;
        this._rotation = 0;
        this._xPosition = 0;
        this._yPosition = 0;
        this._zIndex = 0;
        this._image = {};
        this._value = "";
    }

    DesignObject.prototype.setWidth = function(width) {
        this._width = width;
    };

    DesignObject.prototype.getWidth = function() {
        return this._width;
    };

    DesignObject.prototype.setHeight = function(height) {
        this._height = height;
    };

    DesignObject.prototype.getHeight = function() {
        return this._height;
    };

    DesignObject.prototype.setRotation = function(rotation) {
        this._rotation = rotation;
    };

    DesignObject.prototype.getRotation = function() {
        return this._rotation;
    };

    DesignObject.prototype.setXPosition = function(xPosition) {
        this._xPosition = xPosition;
    };

    DesignObject.prototype.getXPosition = function() {
        return this._xPosition;
    };

    DesignObject.prototype.setYPosition = function(yPosition) {
        this._yPosition = yPosition;
    };

    DesignObject.prototype.getYPosition = function() {
        return this._yPosition;
    };

    DesignObject.prototype.setZIndex = function(zIndex) {
        this._zIndex = zIndex;
    };

    DesignObject.prototype.getZIndex = function() {
        return this._zIndex;
    };

    DesignObject.prototype.setImage = function(image) {
        this._image = image;
    };

    DesignObject.prototype.getImage = function() {
        return this._image;
    };

    DesignObject.prototype.setValue = function(value) {
        this._value = value;
    };

    DesignObject.prototype.getValue = function() {
        return this._value;
    };


    return DesignObject;
})();