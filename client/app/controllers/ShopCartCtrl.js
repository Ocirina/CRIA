app.controller('ShopCartCtrl', function($scope, $location, $http, $resource) {
    $scope.loadShopCartDesigns = function() {
        if(window.localStorage['shopCartDesigns']) {
            $scope.shopCartDesigns = JSON.parse(window.localStorage['shopCartDesigns']);
            $scope.orderLines = [];

            for(var i = 0; i < $scope.shopCartDesigns.length; i++) {
                $scope.orderLines[i] = {product:$scope.shopCartDesigns[i]["product"], aantal: $scope.shopCartDesigns[i]["aantal"]};
            }
        }
    };

    $scope.changeAmount = function(product, input){
        if(window.localStorage['shopCartDesigns']) {
            $scope.shopCartDesigns = JSON.parse(window.localStorage['shopCartDesigns']);
            var orderlines = [];

            for(var i = 0; i < $scope.shopCartDesigns.length; i++) {
                if($scope.shopCartDesigns[i].product._id == product._id){
                    orderlines[i] = {product:$scope.shopCartDesigns[i]["product"], aantal: input.orderline.aantal};
                } else {
                    orderlines[i] = {product:$scope.shopCartDesigns[i]["product"], aantal: $scope.shopCartDesigns[i]["aantal"]};
                }
            }

            window.localStorage['shopCartDesigns'] = JSON.stringify(orderlines);
        }
    }

    $scope.loadPaymentMethods = function() {
        $location.path('/betalen/kiezen');
    };
});
