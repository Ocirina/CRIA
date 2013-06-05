app.controller('ShopCartCtrl', function($scope, $location, $http, $resource) {
    $scope.loadShopCartDesigns = function() {
        if(window.localStorage['Order']) {
            $scope.shopCartDesigns = JSON.parse(window.localStorage['Order']);
            $scope.order.orderLines = [];

            for(var i = 0; i < $scope.shopCartDesigns.length; i++) {
                $scope.order.orderLines[i] = {product:$scope.shopCartDesigns[i]["product"], aantal: $scope.shopCartDesigns[i]["aantal"]};
            }
        }
    };

    $scope.changeAmount = function(product, input){
        if(window.localStorage['Order']) {
            $scope.order = JSON.parse(window.localStorage['Order']);
            var orderlines = [],
                amount = 0;

            for(var i = 0; i < $scope.shopCartDesigns.length; i++) {
                amount = $scope.shopCartDesigns[i]["aantal"];

                if($scope.shopCartDesigns[i].product._id === product._id){
                    amount = input.orderline.aantal;
                }

                orderlines[i] = {product:$scope.shopCartDesigns[i]["product"], aantal: amount};
            }

            window.localStorage['Order'] = JSON.stringify(orderlines);
        }
    };

    $scope.removeProduct = function(productId) {
        if(window.localStorage['Order']) {
            $scope.order = JSON.parse(window.localStorage['Order']);

            for(var i = 0; i < $scope.shopCartDesigns.length; i++) {
                if(productId === $scope.shopCartDesigns[i].product._id){
                    $scope.order.orderLines.splice(i, 1);
                    break;
                }
            }

            window.localStorage['Order'] = JSON.stringify($scope.order);
        }
    };

    $scope.loadPaymentMethods = function() {
        $location.path('/betalen/kiezen');
    };
});
