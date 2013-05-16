/**
 * @author Willem van Lent (willemvanlent@live.nl)
 * @copyright Copyright (c) 2013, HAN, Arnhem - All rights reserved
 * @version 1.0.0
 */
var User = (function() {
    var name;
    var email;
    var firstName;
    var lastName;
    var birthDate;
    var password;

    function User(dataArray){

    };

    User.prototype.setName = function(name) {
        User.prototype.name = name;
    };

    User.prototype.getName = function() {
        return User.prototype.name;
    };

    User.prototype.setEmail = function(email) {
        User.prototype.email = email;
    };

    User.prototype.getEmail = function() {
        return User.prototype.email;
    };

    User.prototype.setFirstName = function(firstName) {
        User.prototype.firstName = firstName;
    };

    User.prototype.getFirstName = function() {
        return User.prototype.firstName;
    };

    User.prototype.setLastName = function(lastName) {
        User.prototype.lastName = lastName;
    };

    User.prototype.getLastName = function() {
        return User.prototype.lastName;
    };

    User.prototype.setBirthDate = function(birthDate) {
        User.prototype.birthDate = birthDate;
    };

    User.prototype.getBirthDate = function() {
        return User.prototype.birthDate;
    };

    User.prototype.setPassword = function(password) {
        User.prototype.password = password;
    };

    User.prototype.getPassword = function() {
        return User.prototype.password;
    };

    return User;
})();