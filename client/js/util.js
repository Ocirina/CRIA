/**
 * Method for checking if an object is empty. The correct way!
 * @scope public
 * @param {Object} The object to check if its empty.
 * @return {Object} True if empty else false.
 */
function isEmpty(obj) {
    if (typeof obj === 'undefined' || obj === null || obj === '') { return true; }
    if (typeof obj === 'number' && isNaN(obj)) { return true; }
    if (obj.length === 0) { return true; }
    if (obj instanceof Date && isNaN(Number(obj))) { return true; }
    return false;
}

function stopEvent(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function hasFileUploadSupport() {
    return (window.File && window.FileReader && window.FileList && window.Blob);
}