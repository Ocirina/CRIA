app.controller('ProductCtrl', function($scope, $location, $http, $resource) {
    $scope.getProducts = function() {
        var Products = $resource('http://autobay.tezzt.nl:43083/casedesigns',{},
            {charge: {method:'GET'}}
        );
        var products = new Products();
        console.log(products.$get());
    };
});