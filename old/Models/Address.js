/**
 * @author Willem van Lent (willemvanlent@live.nl)
 * @copyright Copyright (c) 2013, HAN, Arnhem - All rights reserved
 * @version 1.0.0
 */
var Address = (function() {

    function Address(dataArray){
        this._street = "";
        this._houseNumber = 0;
        this._postalCode = "";
        this._city = "";
        this._province = "";
        this._country = "";
    }

    Address.prototype.setStreet = function(street) {
        this._street = street;
    };

    Address.prototype.getStreet = function() {
        return this._street;
    };

    Address.prototype.setHouseNumber = function(houseNumber) {
        this._houseNumber = houseNumber;
    };

    Address.prototype.getHouseNumber = function() {
        return this._houseNumber;
    };

    Address.prototype.setPostalCode = function(postalCode) {
        this._postalCode = postalCode;
    };

    Address.prototype.getPostalCode = function() {
        return this._postalCode;
    };

    Address.prototype.setCity = function(city) {
        this._city = city;
    };

    Address.prototype.getCity = function() {
        return this._city;
    };

    Address.prototype.setProvince = function(province) {
        this._province = province;
    };

    Address.prototype.getProvince = function() {
        return this._province;
    };

    Address.prototype.setCountry = function(country) {
        this._country = country;
    };

    Address.prototype.getCountry = function() {
        return this._country;
    };

    return Address;
})();