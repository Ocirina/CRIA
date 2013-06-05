app.controller('ShopCartCtrl', function($scope, $location, $http, $resource) {
    $scope.loadShopCartDesigns = function() {
        if(window.localStorage['Order']) {
            $scope.order = JSON.parse(window.localStorage['Order']);
            $scope.order.orderlines = [];

            for(var i = 0; i < $scope.order.orderlines.length; i++) {
                $scope.order.orderlines[i] = {product:$scope.order.orderlines[i]["product"], aantal: $scope.order.orderlines[i]["aantal"]};
            }
        }
    };

    $scope.changeAmount = function(product, input){
        if(window.localStorage['Order']) {
            $scope.order = JSON.parse(window.localStorage['Order']);
            var orderlines = [],
                amount = 0;

            for(var i = 0; i < $scope.order.orderlines.length; i++) {
                amount = $scope.order.orderlines[i]["aantal"];

                if($scope.order.orderlines[i].product._id === product._id){
                    amount = input.orderline.aantal;
                }

                orderlines[i] = {product:$scope.order.orderlines[i]["product"], aantal: amount};
            }
            $scope.order.orderlines = orderlines;
            window.localStorage['Order'] = JSON.stringify($scope.order);
        }
    };

    $scope.removeProduct = function(productId) {
        if(window.localStorage['Order']) {
            $scope.order = JSON.parse(window.localStorage['Order']);

            for(var i = 0; i < $scope.order.orderlines.length; i++) {
                if(productId === $scope.order.orderlines[i].product._id){
                    $scope.order.orderlines.splice(i, 1);
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
