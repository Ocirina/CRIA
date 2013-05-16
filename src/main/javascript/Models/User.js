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

    User.prototype.setEmail = function(mail) {
        User.prototype.mail = mail;
    };

    User.prototype.getEmail = function() {
        return User.prototype.email;
    };

    return User;
})();