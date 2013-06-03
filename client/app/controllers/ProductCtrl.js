app.controller('ProductCtrl', function($scope, $location, $http, $resource, $routeParams) {
    $scope.getProducts = function() {
        var Products = $resource('http://autobay.tezzt.nl\\:43083/casedesigns',{},
            {charge: {method:'GET', params:{charge:true}}}
        );

        var product = Products.get(function(data){
			$scope.products = data;
		});
    };

    $scope.getProduct = function() {
        var id = $routeParams.id;

        var Product = $resource('http://autobay.tezzt.nl\\:43083/casedesign/' + id,{},
            {charge: {method:'GET', params:{charge:true}}}
        );

        var product = Product.get(function(data){
            $scope.product = data.result;
        });
    };

    $scope.addProductToShopCart = function() {
        if (!window.localStorage['shopCartDesigns']) {
            window.localStorage['shopCartDesigns'] = [];
        }

        window.localStorage['shopCartDesigns'].push({"product": $scope.product, "amount":1})
    }
});
