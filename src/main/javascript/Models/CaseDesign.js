/**
 * @author Willem van Lent (willemvanlent@live.nl)
 * @copyright Copyright (c) 2013, HAN, Arnhem - All rights reserved
 * @version 1.0.0
 */
var CaseDesign = (function() {

    function CaseDesign(dataArray){
        this._name = "";
        this._previewImage = {};
        this._shared = false;
        this._prices = [];
        this._ratings = [];
        this._comments = [];
        this._designObjects = [];
        this._revision = {};
    }

    CaseDesign.prototype.setName = function(name) {
        this._name = name;
    };

    CaseDesign.prototype.getName = function() {
        return this._name;
    };

    CaseDesign.prototype.setPreviewImage = function(previewImage) {
        this._previewImage = previewImage;
    };

    CaseDesign.prototype.getName = function() {
        return this._previewImage;
    };

    CaseDesign.prototype.setShared = function(shared) {
        this._shared = shared;
    };

    CaseDesign.prototype.getShared = function() {
        return this._shared;
    };

    CaseDesign.prototype.setPrices = function(prices) {
        this._prices = prices;
    };

    CaseDesign.prototype.getPrices = function() {
        return this._prices;
    };

    CaseDesign.prototype.addPrice = function(price) {
        if(price === Price) {
            this._prices[this._prices.length] = price;
        }
    };

    CaseDesign.prototype.setRatings = function(ratings) {
        this._ratings = ratings;
    };

    CaseDesign.prototype.getRatings = function() {
        return this._ratings;
    };

    CaseDesign.prototype.addRating = function(rating) {
        if(rating === Rating) {
            this._ratings[this._ratings.length] = rating;
        }
    };

    CaseDesign.prototype.setComments = function(comments) {
        this._comments = comments;
    };

    CaseDesign.prototype.getComments = function() {
        return this._comments;
    };

    CaseDesign.prototype.addComment = function(comment) {
        if(comment === Comment) {
            this._comments[this._comments.length] = comment;
        }
    };

    CaseDesign.prototype.setDesignObjects = function(designObjects) {
        this._designObjects = designObjects;
    };

    CaseDesign.prototype.getDesignObjects = function() {
        return this._designObjects;
    };

    CaseDesign.prototype.addDesignObject = function(designObject) {
        if(designObject === DesignObject) {
            this._designObjects[this._designObjects.length] = designObject;
        }
    };

    CaseDesign.prototype.setRevision = function(revision) {
        this._revision = revision;
    };

    CaseDesign.prototype.getRevision = function() {
        return this._revision;
    };

    return CaseDesign;
})();