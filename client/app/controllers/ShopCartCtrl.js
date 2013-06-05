app.controller('ShopCartCtrl', function($scope, $location, $http, $resource) {
    $scope.loadShopCartDesigns = function() {
        if(window.localStorage['Order']) {
            var order = JSON.parse(window.localStorage['Order']);
            $scope.order = {
                orderlines: []
            };

            for(var i = 0; i < order.orderlines.length; i++) {
                $scope.order.orderlines.push({caseDesign:order.orderlines[i]["caseDesign"], aantal: order.orderlines[i]["aantal"]});
            }
        }
    };

    $scope.changeAmount = function(caseDesign, input){
        if(window.localStorage['Order']) {
            var shopCartDesigns = JSON.parse(window.localStorage['Order']);
            var amount = 0, order = {
                orderlines: []
            };

            for(var i = 0; i < shopCartDesigns.orderlines.length; i++) {
                amount = shopCartDesigns.orderlines[i]["aantal"];

                if(shopCartDesigns.orderlines[i].caseDesign._id === caseDesign._id){
                    console.log(input);
                    amount = input.orderline.aantal;
                }
                console.log(amount);

                order.orderlines[i] = {caseDesign:shopCartDesigns.orderlines[i]["caseDesign"], aantal: amount};
            }
            window.localStorage['Order'] = JSON.stringify(order);
        }
    };

    $scope.removeProduct = function(caseDesignId) {
        if(window.localStorage['Order']) {
            $scope.order = JSON.parse(window.localStorage['Order']);

            for(var i = 0; i < $scope.order.orderlines.length; i++) {
                if(caseDesignId === $scope.order.orderlines[i].caseDesign._id){
                    caseDesignId.order.orderlines.splice(i, 1);
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
