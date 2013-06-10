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
        $scope.loggedinUser = JSON.parse(window.sessionStorage['loggedInUser']);

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
    $scope.addProductToShopCart = function(productParam) {
        var order = {
            orderlines: []
        };

        var product;

        if(productParam === undefined){
            product = $scope.product;
        } else {
            product = productParam;
        }

        if (!window.localStorage['Order']) {
            window.localStorage['Order'] = JSON.stringify(order);
        }

        order = JSON.parse(window.localStorage['Order']);
        var productAdded = $scope.checkProductInShopCart(product._id);
        if(!productAdded) {
            order.orderlines.push({"caseDesign": product, "aantal":1});
            window.localStorage['Order'] = JSON.stringify(order);
        }

        Application.notify('ok', 'Product is toegevoegd.');

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
            var newArray = [];
            if(i < data.result){
                newArray.name = 'icon-star';
            } else {
                newArray.name = 'icon-star-empty';
            }
            newArray.i = i + 1;

            ratings.push(newArray);
        }

        $scope.ratings = ratings;
    };

    /**
     * This function will add the rating to the server.
     * @param {Number} value
     */
    $scope.addRating = function(value) {
        if(window.sessionStorage['loggedInUser'] !== undefined){
            var Ratings = $resource('http://autobay.tezzt.nl\\:43083/casedesign/:id/ratings', {id: '@caseDesign'},
                {charge: {method:'POST', params:{charge:true}}}
            );

            var user = JSON.parse(window.sessionStorage['loggedInUser']);

            var ratings = {
                user:       user._id,
                caseDesign: $scope.product._id,
                amount:     +value
            };

            var rating = new Ratings(ratings);
            rating.$save(function(data) {
                if(data.error === null){
                    $scope.getSociable($scope.product._id, 'ratings', $scope.createStarsFromNumber);
                    Application.notify('ok', 'Rating succesvol geplaatst.');
                } else {
                    Application.notify('error', 'Rating is niet geplaatst.');
                }
            });
        } else {
            Application.notify('error', 'Je moet ingelogd zijn om te stemmen.');
        }
    };

    /**
     * This function will post an comment to the server that wil save it. It's also directly showed on the website.
     */
    $scope.addComment = function() {
        if(window.sessionStorage['loggedInUser'] !== undefined){
            var Comments = $resource('http://autobay.tezzt.nl\\:43083/casedesign/:id/comments', {id: '@caseDesign'},
                {charge: {method:'POST', params:{charge:true}}}
            );

            var user = JSON.parse(window.sessionStorage['loggedInUser']);

            var comment = {
                user:       user._id,
                caseDesign: $scope.product._id,
                comment:    $scope.comment
            };

            var comment = new Comments(comment);
            comment.$save(function(data) {
                if(data.result !== null){
                    data.result.user = user;
                    $scope.comments.push(data.result);
                    Application.notify('ok', 'Commentaar succesvol geplaatst.');
                } else {
                    Application.notify('error', 'Commentaar is niet opgeslagen, probeer opnieuw.');
                }
            });
        } else {
            Application.notify('error', 'Je moet ingelogd zijn om te reageren.');
        }
    };

    $scope.removeSociable = function(type, id){
        if(window.sessionStorage['loggedInUser'] !== undefined){
            var Sociable = $resource('http://autobay.tezzt.nl\\:43083/casedesign/:id/' + type, {id: '@id', type: '@type'},
                {charge: {method:'DELETE', params:{charge:true}}}
            );

            var sociable = {
                id:     id,
                type:   type
            };

            new Sociable(sociable);
        } else {
            Application.notify('error', 'Je moet ingelogd zijn een reactie te verwijderen.');
        }
    }
});
