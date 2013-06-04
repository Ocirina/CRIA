app.controller('ShopCartCtrl', function($scope, $location, $http, $resource) {
    $scope.loadShopCartDesigns = function() {
        if(window.localStorage['shopCartDesigns']) {
            $scope.shopCartDesigns = JSON.parse(window.localStorage['shopCartDesigns']);
            $scope.orderLines = [];

            for(var i = 0; i < $scope.shopCartDesigns.length; i++) {
                $scope.orderLines[i] = {product:$scope.shopCartDesigns[i]["product"], aantal: $scope.shopCartDesigns[i]["amount"]};
            }
        }
    };

    $scope.loadPaymentMethods = function() {
        $location.path('/betalen/kiezen');
    };
});
