/**
 * To keep the HTML document clean this methode had been created.
 * This will load all the javascripts in the js/ dir.
 * @param {Array} scripts The javascripts to include in the page.
 */
function loadScripts(scripts) {
    var index, src, script;
    for (index in scripts) {
        if (!isEmpty(scripts[index])) {
            src = 'javascript/' + scripts[index] + '.js';
            script = document.createElement('script');
            script.src = src;
            document.body.appendChild(script);
        }
    }
}
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

/**
 * Adds datapoints to the array in the format used in the CanvasJS chart library.
 * @param {Number} item The item to display.
 * @param {String} label The label to the corresponding item.
 * @param {Array} dataPoints The datapoints array to push the point in.
 * @return {Array} The datapoints array with the added point.
 */
function addDataPoint(item, label, dataPoints) {
    dataPoints.push({
        y: item, label: label
    });
    return dataPoints;
}
