app.controller('DesignCtrl', function($scope, $location) {
    $scope.activatePhone = function(phoneId) {
        $scope.phone.phone = phoneId;
    }

    $scope.setCaseType = function(caseTypeId) {
        $scope.phone.case = caseTypeId;
    }
});
