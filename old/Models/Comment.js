/**
 * @author Willem van Lent (willemvanlent@live.nl)
 * @copyright Copyright (c) 2013, HAN, Arnhem - All rights reserved
 * @version 1.0.0
 */
var Comment = (function() {

    function Comment(dataArray){
        this._text = "";
        this._dateCreated = "";
    }

    Comment.prototype.setText = function(text) {
        this._text = text;
    };

    Comment.prototype.getText = function() {
        return this._text;
    };

    Comment.prototype.setCreationDate = function(creationDate) {
        this._dateCreated = creationDate;
    };

    Comment.prototype.getCreationDate = function() {
        return this._dateCreated;
    };

    return Comment;
})();