describe('The isEmpty function', function () {
    it ('should return false with a string "hello world"', function() {
        var string = "Hello world";
        var result = isEmpty(string);
        expect(result).toBe(false);
    });
    it ('should return false with an array with items', function() {
        var arr = ["Hello","World"];
        var result = isEmpty(arr);
        expect(result).toBe(false);
    });
    it ('should return true with an empty array', function() {
        var arr = [];
        var result = isEmpty(arr);
        expect(result).toBe(true);
    });
    it ('should return true with an empty string', function() {
        var string = '';
        var result = isEmpty(string);
        expect(result).toBe(true);
    });
    it ('should return true with undefined', function() {
        var result = isEmpty(undefined);
        expect(result).toBe(true);
    });
    it ('should return true with null', function() {
        var result = isEmpty(null);
        expect(result).toBe(true);
    });
    it ('should return false with NaN', function() {
        var result = isEmpty(Number.NaN);
        expect(result).toBe(true);
    });
});

describe('The addDataPoint function', function(){
    it ('should add a point with "5" and "Hello"', function() {
        var dataPoints = [];
        var result = addDataPoint(5, "Hello", dataPoints);
        expect(result[0].y).toEqual(5);
        expect(result[0].label).toEqual("Hello");
    });
    it ('should add a point with "10" and "World" to an existing array', function() {
        var dataPoints = [{y:5,label:"Hello"}];
        dataPoints = addDataPoint(10, "World", dataPoints);
        var result = dataPoints[dataPoints.length-1];

        expect(result.y).toEqual(10);
        expect(result.label).toEqual("World");
    });
    it ('should contain an object with y and label attribute', function() {
        var dataPoints = [];
        dataPoints = addDataPoint(10, "World", dataPoints);
        var result = dataPoints[0];

        expect(result.hasOwnProperty("y")).toBe(true);
        expect(result.hasOwnProperty("label")).toEqual(true);
    });
});

describe('The loadScripts function', function(){
    beforeEach(function(){
        var body = document.body;
        if (body.hasChildNodes()) {
            while (body.childNodes.length >= 1) {
                body.removeChild(body.firstChild);
            }
        }
    });

    it ('should do nothing with an empty array', function() {
        var scripts = [];
        loadScripts(scripts);
        expect(document.body.childNodes.length).toBe(0);
    });

    it ('should add a script to the body', function() {
        var scripts = ['blank'];
        loadScripts(scripts);
        var script = document.body.firstChild;
        expect(document.body.childNodes.length).toBe(1);
        expect(script.tagName).toEqual("SCRIPT");
        expect(script.src).toEqual("javascript/blank.js");
    });
    it ('should add two scripts to the body', function() {
        var scripts = ['blank', 'another_blank'];
        loadScripts(scripts);
        expect(document.body.childNodes.length).toBe(2);
    });
    it ('should add a script in a subdir to the body', function() {
        var scripts = ['libs/blank_lib'];
        loadScripts(scripts);
        var script = document.body.firstChild;
        expect(document.body.childNodes.length).toBe(1);
        expect(script.tagName).toEqual("SCRIPT");
        expect(script.src).toEqual("javascript/libs/blank_lib.js");

    });
});
