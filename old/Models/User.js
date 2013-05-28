/**
 * @author Willem van Lent (willemvanlent@live.nl)
 * @copyright Copyright (c) 2013, HAN, Arnhem - All rights reserved
 * @version 1.0.0
 */
var User = (function() {

    function User(dataArray){
        this._name = "";
        this._email = "";
        this._firstName = "";
        this._lastName = "";
        this._birthDate = "";
        this._password = "";
        this._address = null;
        this._ratings = [];
        this._comments = [];
        this._caseDesigns = [];
        this._orders = [];
    }

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

    User.prototype.setAddress = function(address) {
        this._address = address;
    };

    User.prototype.getAddress = function() {
        return this._address;
    };

    User.prototype.setRatings = function(ratings) {
        this._ratings = ratings;
    };

    User.prototype.getRatings = function() {
        return this._ratings;
    };

    User.prototype.addRating = function(rating) {
        if(rating === Rating) {
            this._ratings[this._ratings.length] = rating;
        }
    };

    User.prototype.setComments = function(comments) {
        this._comments = comments;
    };

    User.prototype.getComments = function() {
        return this._comments;
    };

    User.prototype.addComment = function(comment) {
        if(comment === Comment) {
            this._comments[this._comments.length] = comment;
        }
    };

    User.prototype.setCaseDesigns = function(caseDesigns) {
        this._caseDesigns = caseDesigns;
    };

    User.prototype.getCaseDesigns = function() {
        return this._caseDesigns;
    };

    User.prototype.addCaseDesign = function(caseDesign) {
        if(caseDesign === CaseDesign) {
            this._caseDesigns[this._caseDesigns.length] = caseDesign;
        }
    };

    User.prototype.setOrders = function(orders) {
        this._orders = orders;
    };

    User.prototype.getOrders = function() {
        return this._orders;
    };

    User.prototype.addOrder = function(order) {
        if(order === Order) {
            this._orders[this._caseDesigns._orders] = order;
        }
    };

    return User;
})();