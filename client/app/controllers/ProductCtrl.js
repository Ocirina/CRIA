app.controller('ProductController', function($scope, $location, $http, $resource) {
    $scope.getProducts = function() {
        var Products = $resource('http://autobay.tezzt.nl:43083/casedesigns',{},
            {charge: {method:'GET', params:{charge:true}}}
        );
        var products = new Products();
        console.log(products.get())
    };
});