app.controller('ProductCtrl', function($scope, $location, $http, $resource, $routeParams) {
    /**
     * This function will get all the products by get request and put them in the $scope.products var.
     */
    $scope.getProducts = function() {
        var Products = $resource('http://autobay.tezzt.nl\\:43083/casedesigns',{},
            {charge: {method:'GET', params:{charge:true}}}
        );

        var product = Products.get(function(data){
			$scope.products = data;
		});
    };

    /**
     * This function will put the product in the $scope.product variable. The id will be get out of the URL.
     * Also it will get the comments and ratings. The ratings will be converted to an array with CSS classes.
     * So if we loop trough the array we can use the classes to generate stars filled in or not.
     */
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

    /**
     * This function will make an get call to casedesigns. We will provide a param as type.
     * If we put in "comments" as type it will get all the comments.
     *
     * @param {Number} id
     * @param {String} type
     * @param {Function} callback
     */
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

    /**
     * This function will add the product to the local storage cart. This product will be provided by the $scope var.
     */
    $scope.addProductToShopCart = function() {
        var order = {
            orderlines: []
        };

        if (!window.localStorage['Order']) {
            window.localStorage['Order'] = JSON.stringify(order);
        }

        order = JSON.parse(window.localStorage['Order']);
        var productAdded = $scope.checkProductInShopCart($scope.product._id);
        if(!productAdded) {
            order.orderlines.push({"caseDesign": $scope.product, "aantal":1});
            window.localStorage['Order'] = JSON.stringify(order);
        }

        $location.path('/winkelwagen');
    };

    /**
     * This function will check if the product is already in the cart. If it is there will be added 1 case.
     * And true is returend so the product would not be added again as new product to the cart.
     *
     * @param {Number} productId
     * @returns {boolean}
     */
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

    /**
     * This function wil generate an array of Strings. These Strings are css classes. As the name says this are stars.
     *
     * @param {Array} data
     */
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

    $scope.addComment = function() {

    };
});
