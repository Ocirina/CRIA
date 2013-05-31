app.controller('ProductCtrl', function($scope, $location, $http, $resource) {
    $scope.getProducts = function() {
        var Products = $resource('http://autobay.tezzt.nl\\:43083/casedesigns',{},
            {charge: {method:'GET', params:{charge:true}}}
        );

        var product = Products.get();

        console.log(product);
        console.log(product['result']);

//        $scope.product.products = products.result;
    };
});