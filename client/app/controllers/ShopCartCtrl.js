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
            var orderlines = [],
                amount = 0;

            for(var i = 0; i < $scope.shopCartDesigns.length; i++) {
                amount = $scope.shopCartDesigns[i]["aantal"];

                if($scope.shopCartDesigns[i].product._id == product._id){
                    amount = input.orderline.aantal;
                }

                orderlines[i] = {product:$scope.shopCartDesigns[i]["product"], aantal: amount};
            }

            window.localStorage['shopCartDesigns'] = JSON.stringify(orderlines);
        }
    }

    $scope.loadPaymentMethods = function() {
        $location.path('/betalen/kiezen');
    };
});
