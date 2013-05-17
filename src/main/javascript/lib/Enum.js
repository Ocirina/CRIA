function Enum() {
    var that = this;
    for (var i in arguments) {
        that[arguments[i]] = i;
    }
    this.name = function(value) {
        for (var key in that) {
            if (that[key] == value) {
                return key;
            }
        }
    };
    this.exist = function(value) {
        return (typeof that.name(value) !== "undefined");
    };
    if (Object.freeze) {
        Object.freeze(that);
    }
}