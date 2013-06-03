app.controller('ShopCartCtrl', function($scope, $location, $http, $resource) {
    $scope.loadShopCartDesigns = function() {
        if(window.localStorage['shopCartDesigns']) {
            $scope.shopCartDesigns = window.localStorage['shopCartDesigns'];
            $scope.orderLines = [];

            for(var i = 0; i < shopCartDesigns.length; i++) {
                $scope.orderLines[i] = {product:$scope.shopCartDesigns[i]["product"], aantal: $scope.shopCartDesigns[i]["amount"]};
            }
        }
    }
});
