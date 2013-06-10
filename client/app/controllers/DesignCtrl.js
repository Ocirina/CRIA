app.controller('DesignCtrl', function($scope, $location) {
    /**
     * Set the certain type of phone.
     *
     * @param {Number} phoneId
     */
    $scope.activatePhone = function(phoneId) {
        $scope.phone.phone = phoneId;
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