/*global Application, app, $ */
/*jslint browser: true, node: true, nomen: true, plusplus: true */
/**
 * The Product Controller
 * Handles the functions of the galleries and the product page.
 * Is able to retrieve casedesigns and adding a case design to the shopping cart.
 * Also is able to create and delete comments and can create ratings for the case design
 *
 * @see http://docs.angularjs.org/
 */
app.controller('ProductCtrl', function ($scope, $location, $resource, $routeParams) {
    "use strict";

    /**
     * This function will get all the products.
     * First it creates the request with the $resource service
     * Then it executes the GET request and in the callback put them in the $scope.products variable.
     *
     * @see http://docs.angularjs.org/api/ngResource.$resource
     */
    $scope.getProducts = function () {
        var Products = $resource('http://autobay.tezzt.nl\\:43083/casedesigns', {},
            {
                charge: {
                    method: 'GET',
                    params: {
                        charge: true
                    }
                }
            }
        );

        Products.get(function (data) {
            $scope.products = data;
        });
    };

    /**
     * Gets the products of the user if he's logged in.
     * First it creates a GET request with the given $resource service.
     * Then it executes the request and in the callback the casedesigns will be saved to the products model in $scope.
     *
     * @see http://docs.angularjs.org/api/ngResource.$resource
     */
    $scope.getProductsByLoggedInUser = function () {
        $scope.hasUser = false;
        if (window.sessionStorage.loggedInUser) {
            $scope.hasUser = true;

            var user = JSON.parse(window.sessionStorage.loggedInUser),

                Products = $resource('http://autobay.tezzt.nl\\:43083/gallery/:id', { id: user._id},
                    {charge: {method: 'GET', params: {charge: true}}}
                );

            Products.get(function (data) {
                $scope.products = data.result.caseDesigns;
            });

        }
    };

    /**
     * Gets the products of the user by the given user id.<br>
     * First it retrieves the user id from the $routeParams.<br>
     * Then it creates a GET request with the given $resource service.<br>
     * Then it executes the request and in the callback the user and it's designs will be saved to the $scope.user
     * variable.<br>
     * After that it redirects the user to the gallery of the retrieved user if the logged in user is the same as the
     * retrieved user.
     *
     * @see http://docs.angularjs.org/api/ngResource.$resource
     */
    $scope.getProductsByGivenUser = function () {
        var userId = $routeParams.userid,

            Products = $resource('http://autobay.tezzt.nl\\:43083/gallery/:id', { id: userId },
                {charge: {method: 'GET', params: {charge: true}}}
            ),
            user;

        Products.get(function (data) {
            $scope.user = data.result;

            if (window.sessionStorage.loggedInUser) {
                user = JSON.parse(window.sessionStorage.loggedInUser);
                $scope.hasUser = true;
                if ($scope.user._id === user._id) {
                    $location.path("/producten/user");
                }
            }
        });
    };

    /**
     * Redirects the user to the edit page with the given case id.
     * @param caseDesignId
     */
    $scope.openDesignInEditor = function (caseDesignId) {
        $location.path("/ontwerpen/bewerken/" + caseDesignId);
    };

    /**
     * This function will put the product in the $scope.product variable. The id will be get out of the URL.
     * Also it will get the comments and ratings. The ratings will be converted to an array with CSS classes.
     * So if we loop trough the array we can use the classes to generate stars filled in or not.
     *
     * @see http://docs.angularjs.org/api/ngResource.$resource
     */
    $scope.getProduct = function () {
        if (window.sessionStorage.loggedInUser) {
            $scope.loggedinUser = JSON.parse(window.sessionStorage.loggedInUser);
        }

        var id = $routeParams.id,
            Product = $resource('http://autobay.tezzt.nl\\:43083/casedesign/' + id, {},
                {charge: {method: 'GET', params: {charge: true}}}
            );

        Product.get(function (data) {
            $scope.product = data.result;
            $scope.getSociable($scope.product._id, 'ratings', $scope.createStarsFromNumber);
            $scope.getSociable($scope.product._id, 'comments');

            if ($scope.loggedinUser) {
                $scope.false = true;
                if ($scope.product.user._id == $scope.loggedinUser._id) {
                    $scope.sameUser = true;
                }
            }
        });
    };

    /**
     * This function will make an get call to casedesigns. We will provide a param as type.
     * If we put in "comments" as type it will get all the comments.
     *
     * @param {Number} id
     * @param {String} type
     * @param {Function} callback
     *
     * @see http://docs.angularjs.org/api/ngResource.$resource
     */
    $scope.getSociable = function (id, type, callback) {
        if (typeof callback !== "function") {
            callback = function (data) {
                $scope[type] = data.result;
            };
        }

        var Item = $resource('http://autobay.tezzt.nl\\:43083/casedesign/' + id + '/' + type, {},
            {charge: {method: 'GET', params: {charge: true}}}
        );

        Item.get(callback);
    };

    /**
     * This function will add the product to the local storage cart. This product will be provided by the $scope var.
     */
    $scope.addProductToShopCart = function (productParam) {
        var order = {
                orderlines: []
            },

            product,
            productAdded;

        if (productParam === undefined) {
            product = $scope.product;
        } else {
            product = productParam;
        }

        if (!window.localStorage.Order) {
            window.localStorage.Order = JSON.stringify(order);
        }

        order = JSON.parse(window.localStorage.Order);
        productAdded = $scope.checkProductInShopCart(product._id);

        if (!productAdded) {
            order.orderlines.push({"caseDesign": product, "aantal": 1});
            window.localStorage.Order = JSON.stringify(order);
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
    $scope.checkProductInShopCart = function (productId) {
        var order = JSON.parse(window.localStorage.Order),
            i = 0;

        for (i = 0; i < order.orderlines.length; i++) {
            if (order.orderlines[i].caseDesign._id === productId) {
                order.orderlines[i].aantal += 1;
                window.localStorage.Order = JSON.stringify(order);

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
    $scope.createStarsFromNumber = function (data) {
        var ratings = [],
            i,
            newArray = [],
            amount = parseInt(data.result, 10);

        for (i = 1; i <= 5; i++) {
            newArray = [];
            if (i <= amount) {
                newArray.name = 'icon-star';
            } else {
                newArray.name = 'icon-star-empty';
            }
            ratings[(i-1)] = newArray;
        }

        $scope.ratings = ratings;
    };

    /**
     * Creates a rating with the given value if the user is logged in.
     * First it creates the a POST request with the given $resource service.<br>
     * Then it sets the attributes of the rating.<br>
     * After that the rating will be saved and in the callback the rating of the product will be updated and the user
     * will be notified.
     * @param {Number} value
     *
     * @see http://docs.angularjs.org/api/ngResource.$resource
     */
    $scope.addRating = function (value) {
        if (window.sessionStorage.loggedInUser !== undefined) {
            var Ratings = $resource('http://autobay.tezzt.nl\\:43083/casedesign/:id/ratings', {id: '@caseDesign'},
                    {charge: {method: 'POST', params: {charge: true}}}
                ),

                user = JSON.parse(window.sessionStorage.loggedInUser),

                ratings = {
                    user: user._id,
                    caseDesign: $scope.product._id,
                    amount: +value
                },

                ratingObj = new Ratings(ratings);

            ratingObj.$save(function (data) {
                if (data.error === null) {
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
     * Creates a comment with the value of the model comment in the $scope if the user is logged in.
     * First it creates the a POST request with the given $resource service.<br>
     * Then it sets the attributes of the comment.<br>
     * After that the comment will be saved and in the callback the comments of the product will be updated and the user
     * will be notified.
     *
     * @see http://docs.angularjs.org/api/ngResource.$resource
     */
    $scope.addComment = function () {
        if (window.sessionStorage.loggedInUser !== undefined) {
            var Comments = $resource('http://autobay.tezzt.nl\\:43083/casedesign/:id/comments', {id: '@caseDesign'},
                    {charge: {method: 'POST', params: {charge: true}}}
                ),

                user = JSON.parse(window.sessionStorage.loggedInUser),

                comment = {
                    user: user._id,
                    caseDesign: $scope.product._id,
                    comment: $scope.comment
                },

                commentObj = new Comments(comment);

            commentObj.$save(function (data) {
                if (data.result !== null) {
                    data.result.user = user;

                    $scope.comments.push(data.result);

                    Application.notify('ok', 'Commentaar succesvol geplaatst.');
                    $scope.comment = '';
                } else {
                    Application.notify('error', data.error);
                }
            });
        } else {
            Application.notify('error', 'Je moet ingelogd zijn om te reageren.');
        }
    };

    /**
     * Removes the given type of sociable by the given id if the user is logged in.<br>
     * First it creates a delete request with the given $resource service.<br>
     * Then it sets the attributes of the sociable.<br>
     * After that the comment will be deleted and in the callback the comments in the $scope will be updated and the
     * user will be notified<br>
     *
     * @param {String} type
     * @param {Number} id
     *
     * @see http://docs.angularjs.org/api/ngResource.$resource
     */
    $scope.removeSociable = function (type, id) {
        if (window.sessionStorage.loggedInUser !== undefined) {
            var Sociable = $resource('http://autobay.tezzt.nl\\:43083/:type/:id', {id: '@id', type: '@type'},
                    {
                        charge: {
                            method: 'DELETE',
                            params: {
                                charge: true
                            }
                        }
                    }
                ),
                sociable = {
                    id: id,
                    type: type
                },
                comment = new Sociable(sociable),
                index;

            comment.$delete(function (data) {
                if (data.result === true) {
                    for (index = 0; index < $scope.comments.length; index++) {
                        if ($scope.comments[index]._id === id) {
                            $scope.comments.splice(index, 1);
                        }
                    }

                    Application.notify('ok', 'Comment is succesvol verwijderd.');
                } else {
                    Application.notify('error', data.error);
                }
            });
        } else {
            Application.notify('error', 'Je moet ingelogd zijn een reactie te verwijderen.');
        }
    };
});
