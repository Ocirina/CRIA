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

            var Design = $resource('http://autobay.tezzt.nl\\:43083/casedesign/' + caseId,{},
                {charge: {method:'GET', params:{charge:true}}}
            );

            Design.get(function(data) {
                $scope.design = data.result;
            });

            //TODO: get json canvas with the case id & load it in the editor.
        } else {
            // niet ingelogd
        }
    }
});