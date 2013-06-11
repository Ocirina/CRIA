app.controller('DesignCtrl', function($scope, $location, $http, $resource, $routeParams) {
    /**
     * Set the certain type of phone.
     *
     * @param {Number} phoneId
     */
    $scope.activatePhone = function(phoneId) {
        $scope.phone.phone = phoneId;

        $.event.trigger('StartEditor');
    };

    /**
     * Set the Case type id.
     *
     * @param {Number} caseTypeId
     */
    $scope.setCaseType = function(caseTypeId) {
        $scope.phone.case = caseTypeId;
    };

    $scope.getCanvasDesign = function() {
        if(window.sessionStorage["loggedInUser"]) {
            var caseId = $routeParams.id;

            // get json canvas with the case id.
        } else {
            // niet ingelogd
        }
    }
});