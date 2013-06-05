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
            $scope.getSociable($scope.product._id, 'ratings', $scope.createStarsFromNumber);
            $scope.getSociable($scope.product._id, 'comments');
        });
    };

    $scope.getSociable = function(id, type, callback) {
        if(typeof callback !== "function") {
            var callback = function(data) {
                $scope[type] = data.result;
            };
        }

        var Item = $resource('http://autobay.tezzt.nl\\:43083/casedesign/' + id + '/' + type,{},
            {charge: {method:'GET', params:{charge:true}}}
        );

        Item.get(callback);
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
            order.orderlines.push({"caseDesign": $scope.product._id, "aantal":1});
            window.localStorage['Order'] = JSON.stringify(order);
        }

        $location.path('/winkelwagen');
    };

    $scope.checkProductInShopCart = function(productId) {
        var order = JSON.parse(window.localStorage['Order']);
        for(var i = 0; i < order.orderlines.length; i++) {
            if(order.orderlines[i]["caseDesign"]._id == productId) {
                order.orderlines[i]["aantal"] += 1;
                window.localStorage['Order'] = JSON.stringify(order);
                return true;
            }
        }
        return false;
    };

    $scope.createStarsFromNumber = function(data) {
        var ratings = [];

        for(var i=0; i < 5; i++){
            if(i < data.result){
                ratings.push('icon-star');
            } else {
                ratings.push('icon-star-empty');
            }
        }

        $scope.ratings = ratings;
    };
});
