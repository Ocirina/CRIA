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
            $scope.getRating($scope.product._id);
        });
    };

    $scope.getRating = function(productId) {
        var Rating = $resource('http://autobay.tezzt.nl\\:43083/casedesign/' + productId + '/ratings',{},
            {charge: {method:'GET', params:{charge:true}}}
        );

        var rating = Rating.get(function(data){
            $scope.rating = data.result;
        });
    };

    $scope.addProductToShopCart = function() {
        var orderLines = [];

        if (!window.localStorage['shopCartDesigns']) {
            window.localStorage['shopCartDesigns'] = JSON.stringify(orderLines);
        }

        orderLines = JSON.parse(window.localStorage['shopCartDesigns']);
        var productAdded = $scope.checkProductInShopCart($scope.product._id);
        if(!productAdded) {
            orderLines.push({"product": $scope.product, "aantal":1});
            window.localStorage['shopCartDesigns'] = JSON.stringify(orderLines);
        }

        $location.path('/winkelwagen');
    };

    $scope.checkProductInShopCart = function(productId) {
        var orderLines = JSON.parse(window.localStorage['shopCartDesigns']);
        for(var i = 0; i < orderLines.length; i++) {
            if(orderLines[i]["product"]._id == productId) {
                orderLines[i]["aantal"] += 1;
                window.localStorage['shopCartDesigns'] = JSON.stringify(orderLines);
                return true;
            }
        }
        return false;
    }
});
