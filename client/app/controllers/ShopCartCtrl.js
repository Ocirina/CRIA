app.controller('ShopCartCtrl', function($scope, $location, $http, $resource) {
    $scope.loadShopCartDesigns = function() {
        var ShopCartDesigns = $resource('http://autobay.tezzt.nl\\:43083/casedesigns',{},
            {charge: {method:'GET', params:{charge:true}}}
        );

        ShopCartDesigns.get(function(data) {
            $scope.shopCartDesigns = data;
            $scope.orderLines = [];

            for(var i = 0; i < data.result.length; i++) {
                $scope.orderLines[i] = {product:data.result[i], aantal: 1};
            }
        });
    }
});
