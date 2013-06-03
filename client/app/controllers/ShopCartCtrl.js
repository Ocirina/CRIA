app.controller('ShopCartCtrl', function($scope, $location, $http, $resource) {
    $scope.loadShopCartDesigns = function() {
        var ShopCartDesigns = $resource('http://autobay.tezzt.nl\\:43083/casedesigns',{},
            {charge: {method:'GET', params:{charge:true}}}
        );


        ShopCartDesigns.get(function(data) {
            console.log(data);
            $scope.shopCartDesigns = data;
        });
    }
});
