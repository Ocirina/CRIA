/*global Application, app, $ */
/*jslint browser: true, node: true, nomen: true, plusplus: true */

/**
 * Method for checking if an object is empty. The correct way!
 * @scope public
 * @param {Object} The object to check if its empty.
 * @return {Object} True if empty else false.
 */
function isEmpty(obj) {
    "use strict";

    if (typeof obj === 'undefined' || obj === null || obj === '') {
        return true;
    }
    if (typeof obj === 'number' && isNaN(obj)) {
        return true;
    }
    if (obj.length === 0) {
        return true;
    }
    if (obj instanceof Date && isNaN(Number(obj))) {
        return true;
    }
    return false;
}

function stopEvent(e) {
    "use strict";

    e.stopPropagation();
    e.preventDefault();

    return false;
}

function capitaliseFirstLetter(string) {
    "use strict";

    return string.charAt(0).toUpperCase() + string.slice(1);
}

function hasFileUploadSupport() {
    "use strict";

    return (window.File && window.FileReader && window.FileList && window.Blob);
}