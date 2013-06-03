app.controller('DesignCtrl', function($scope, $location) {
    $scope.activatePhone = function(phoneId) {
        $scope.phone = {
            iphone5: false,
            iphone4: false
        };

        if(phoneId == 5) {
            $scope.phone.iphone5 = true;
        } else if(phoneId == 4) {
            $scope.phone.iphone4 = true;
        }
    }

    $scope.setCaseType = function(caseTypeId) {
        console.log(caseTypeId);
    }
});
