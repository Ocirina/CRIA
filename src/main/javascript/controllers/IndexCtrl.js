app.controller('IndexCtrl', function(myService, $scope) {
    myService.async().then(function(data) {
        $scope.test = data;
    });
});