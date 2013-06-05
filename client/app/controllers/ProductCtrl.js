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
            $scope.getSociable($scope.product._id, 'ratings');
            $scope.getSociable($scope.product._id, 'comments');
        });
    };

    $scope.getSociable = function(id, type) {
        var Item = $resource('http://autobay.tezzt.nl\\:43083/casedesign/' + id + '/' + type,{},
            {charge: {method:'GET', params:{charge:true}}}
        );

        Item.get(function(data) {
            $scope[type] = data.result;
        });
    };

    $scope.addProductToShopCart = function() {
        var order = {
            user: "51a7be85315f97dc39000001",
            orderlines: []

        };

        if (!window.localStorage['Order']) {
            window.localStorage['Order'] = JSON.stringify(order);
        }

        order = JSON.parse(window.localStorage['Order']);
        var productAdded = $scope.checkProductInShopCart($scope.product._id);
        if(!productAdded) {
            order.orderlines.push({"product": $scope.product, "aantal":1});
            window.localStorage['Order'] = JSON.stringify(order);
        }

        $location.path('/winkelwagen');
    };

    $scope.checkProductInShopCart = function(productId) {
        var order = JSON.parse(window.localStorage['Order']);
        for(var i = 0; i < order.orderLines.length; i++) {
            if(order.orderLines[i]["product"]._id == productId) {
                order.orderLines[i]["aantal"] += 1;
                window.localStorage['Order'] = JSON.stringify(order);
                return true;
            }
        }
        return false;
    }
});
