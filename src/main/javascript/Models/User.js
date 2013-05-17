/**
 * @author Willem van Lent (willemvanlent@live.nl)
 * @copyright Copyright (c) 2013, HAN, Arnhem - All rights reserved
 * @version 1.0.0
 */
var User = (function() {
//    var _name;
//    var _email;
//    var _firstName;
//    var _lastName;
//    var _birthDate;
//    var _password;

    function User(dataArray){

    };

    User.prototype.setName = function(name) {
        this._name = name;
    };

    User.prototype.getName = function() {
        return this._name;
    };

    User.prototype.setEmail = function(email) {
        this._email = email;
    };

    User.prototype.getEmail = function() {
        return this._email;
    };

    User.prototype.setFirstName = function(firstName) {
        this._firstName = firstName;
    };

    User.prototype.getFirstName = function() {
        return this._firstName;
    };

    User.prototype.setLastName = function(lastName) {
        this._lastName = lastName;
    };

    User.prototype.getLastName = function() {
        return this._lastName;
    };

    User.prototype.setBirthDate = function(birthDate) {
        this._birthDate = birthDate;
    };

    User.prototype.getBirthDate = function() {
        return this._birthDate;
    };

    User.prototype.setPassword = function(password) {
        this._password = password;
    };

    User.prototype.getPassword = function() {
        return this._password;
    };

    return User;
})();