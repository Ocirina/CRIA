app.controller('DesignCtrl', function($scope, $location) {
    /**
     * Set the certain type of phone.
     *
     * @param {Number} phoneId
     */
    $scope.activatePhone = function(phoneId) {
        $scope.phone.phone = phoneId;

        var canvas = document.getElementById('case-editor');
        var context = canvas.getContext('2d');

        var sources = {
            darthVader: 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg',
            yoda: 'http://www.html5canvastutorials.com/demos/assets/yoda.jpg'
        };

        loadImages(sources, function(images) {
            context.drawImage(images.darthVader, 100, 30, 200, 137);
            context.drawImage(images.yoda, 350, 55, 93, 104);
        });
    }

    /**
     * Set the Case type id.
     *
     * @param {Number} caseTypeId
     */
    $scope.setCaseType = function(caseTypeId) {
        $scope.phone.case = caseTypeId;
    }
});

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
        numImages++;
    }
    for(var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}