/**
 * @author Willem van Lent (willemvanlent@live.nl)
 * @copyright Copyright (c) 2013, HAN, Arnhem - All rights reserved
 * @version 1.0.0
 */
var CaseModel = (function() {

    function CaseModel(dataArray){
        this._name = "";
        this._type = "";
        this._colors = [];
        this._caseDesign = {};
    }

    CaseModel.prototype.setName = function(name) {
        this._name = name;
    };

    CaseModel.prototype.getName = function() {
        return this._name;
    };

    CaseModel.prototype.setType = function(type) {
        this._type = type;
    };

    CaseModel.prototype.getType = function() {
        return this._type;
    };

    CaseModel.prototype.setColors = function(colors) {
        this._colors = colors;
    };

    CaseModel.prototype.getColors = function() {
        return this._colors;
    };

    CaseModel.prototype.addColor = function(color) {
        this._colors[this._colors.length] = color;
    };

    CaseModel.prototype.setCaseDesign = function(caseDesign) {
        this._caseDesign = caseDesign;
    };

    CaseModel.prototype.getColors = function() {
        return this._caseDesign;
    };

    return CaseModel;
})();