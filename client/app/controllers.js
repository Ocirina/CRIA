"use-strict";

/* global app, $ */
/*jslint browser: true, node: true, nomen: true, plusplus: true */
/**
 * The Design Controller.
 * Sets the types of phone and cases and is able to trigger the Editor.
 *
 * @see http://docs.angularjs.org/
 */
app.controller('DesignCtrl', function($scope, $location, $http, $resource, $routeParams) {
    /**
     * Set the certain type and case of a phone.
     *
     * @param {Number} phoneId
     */
    $scope.activatePhone = function(phoneId) {
        $scope.phone.phone = phoneId;
        $scope.setCaseType(1);
        $scope.triggerEditor();
    };

    /**
     * Sets the type of case of a phone and triggers the editor.
     *
     * @param {Number} caseTypeId
     */
    $scope.setCaseType = function(caseTypeId) {
        $scope.phone.case = caseTypeId;
        $scope.triggerEditor();
    };

    /**
     * Gets the canvas design when you're logged in.<br>
     * It creates the request with the given $resource service.<br>
     * Then it gets the canvas with the given caseId.<br>
     * Once the request is done the result will be saved to the scope and the editor event will be triggered<br>
     * With information of the scope.<br>
     * <br>
     * If you're not logged in it will show a message that you have to log in to edit the phone case.
     *
     * @see http://docs.angularjs.org/api/ngResource.$resource
     */
    $scope.getCanvasDesign = function() {
        if(window.sessionStorage.loggedInUser) {
            var caseId = $routeParams.id,

                Design = $resource('http://autobay.tezzt.nl\\:43083/canvas/' + caseId,{},
                    {charge: {method:'GET', params:{charge:true}}}
                );

            Design.get(function(data) {
                $scope.design = data.result;
                $scope.phone.phone = $scope.design.phone;
                $scope.phone.case = $scope.design.case;
                $.event.trigger('StartEditor',
                    {
                        phone:  $scope.phone.phone,
                        case: $scope.phone.case,
                        design: $scope.design
                    }
                );
            });

        } else {
            Application.notify('error', 'U bent niet ingelogd, u moet ingelogd zijn om dit hoesje te bewerken.');
        }
    };

    /**
     * Loads the canvas that is saved in the session if it exists.
     * Else it will set the phone and case type by default.
     */
    $scope.loadSessionCanvas = function() {
        if(window.sessionStorage["design"]) {
            var design = JSON.parse(window.sessionStorage["design"]);
            $scope.phone.phone = design.phone;
            $scope.phone.case = design.case;
            $scope.triggerEditor();
        } else {
            $scope.activatePhone(4);
        }
    };

    /**
     * Triggers the editor according to existing values.<br>
     * <br>
     * -If the design exists in the session it will check if the case exists in the model phone in the scope.<br>
     * <br>
     *   -- If thats true, the editor will be triggered and the case and phone type will be given along with the design
     *   in the session.<br>
     *   -- Else it will trigger the editor without the case type, but with the phone type of the phone and the design
     *   in the session<br>
     * <br>
     * -Else it will check if the case attribute exists on the phone model, if thats true it will trigger the editor
     * with the case and phone type.
     * - Else it will just trigger the editor with the phone type, as that value always exists.
     */
    $scope.triggerEditor = function() {
        if (window.sessionStorage["design"]) {
            if($scope.phone.case) {
                $.event.trigger('StartEditor',
                    {
                        phone:  $scope.phone.phone,
                        case:$scope.phone.case,
                        design: JSON.parse(window.sessionStorage["design"])
                    }
                );
            } else {
                $.event.trigger('StartEditor',
                    {
                        phone:  $scope.phone.phone,
                        design: JSON.parse(window.sessionStorage["design"])
                    }
                );
            }
        } else if($scope.phone.case) {
            $.event.trigger('StartEditor',
                {
                    phone:  $scope.phone.phone,
                    case: $scope.phone.case
                }
            );
        } else {
            $.event.trigger('StartEditor',
                {
                    phone:  $scope.phone.phone
                }
            );
        }
    };

    /**
     * Fills the arrays for the backgrounds and objects selection with the defined JSON Objects.
     */
    $scope.fillObjectArrays = function () {
        $scope.backgroundsRowOne = [];
        $scope.backgroundsRowTwo = [];
        $scope.objectsRowOne = [];
        $scope.objectsRowTwo = [];

        $scope.backgroundsRowOne = [
            {
                image:  "img/patterns/dogs.png",
                alt:    "Dogs"
            },
            {
                image:  "img/patterns/dogs&pussies.png",
                alt:    "Dogs and cats"
            },
            {
                image:  "img/patterns/dots_1.png",
                alt:    "Dots"
            },
            {
                image:  "img/patterns/paarstreepjesG.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern1.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern2.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern3.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern4.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern5.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern6.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern7.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern8.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern9.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern10.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pittig_pattern.png",
                alt:    "Stripes"
            }
        ];

        $scope.backgroundsRowTwo = [
            {
                image:  "img/patterns/skull.png",
                alt:    "Dogs"
            },
            {
                image:  "img/patterns/VF_pattern08.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern09.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern10.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern11.jpg",
                alt:    "Dogs"
            },
            {
                image:  "img/patterns/VF_pattern12.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern13.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern14.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern15.jpg",
                alt:    "Dogs"
            },
            {
                image:  "img/patterns/VF_pattern16.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern21.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern18.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern19.jpg",
                alt:    "Dogs"
            },
            {
                image:  "img/patterns/VF_pattern20.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/winterswag.png",
                alt:    "Skull"
            }
        ];

        $scope.objectsRowOne = [
            {
                image:  "img/objects/hartje.svg",
                alt:    "Gewoon"
            },
            {
                image:  "img/objects/patrickster.svg",
                alt:    "Davidster"
            },
            {
                image:  "img/objects/rarezeshoekl.svg",
                alt:    "Rondje"
            },
            {
                image:  "img/objects/rondje.svg",
                alt:    "Gewoon"
            },
            {
                image:  "img/objects/sterretje.svg",
                alt:    "Davidster"
            },
            {
                image:  "img/objects/thumb.svg",
                alt:    "Rondje"
            },
            {
                image:  "img/objects/gewoon.svg",
                alt:    "Gewoon"
            },
            {
                image:  "img/objects/davidster.svg",
                alt:    "Davidster"
            },
            {
                image:  "img/objects/zeshoekmetschevecirkel.svg",
                alt:    "Rondje"
            },
            {
                image:  "img/objects/chick1.svg",
                alt:    "Gewoon"
            },
            {
                image:  "img/objects/chick2.svg",
                alt:    "Davidster"
            },
            {
                image:  "img/objects/chick3.svg",
                alt:    "Rondje"
            },
            {
                image:  "img/objects/boy1.svg",
                alt:    "Rondje"
            },
            {
                image:  "img/objects/peace.svg",
                alt:    "Rondje"
            }
        ];

        $scope.objectsRowTwo = [
            {
                image:  "img/objects/applelogogekleurd.svg",
                alt:    "Sterretje"
            },
            {
                image:  "img/objects/applelogozwart.svg",
                alt:    "Zeester"
            },
            {
                image:  "img/objects/cirkel.svg",
                alt:    "Zeshoek"
            },
            {
                image:  "img/objects/gewoon.svg",
                alt:    "Sterretje"
            },
            {
                image:  "img/objects/zeester.svg",
                alt:    "Zeester"
            },
            {
                image:  "img/objects/zeshoek.svg",
                alt:    "Zeshoek"
            },
            {
                image:  "img/objects/sterretje.svg",
                alt:    "Sterretje"
            },
            {
                image:  "img/objects/zeester.svg",
                alt:    "Zeester"
            },
            {
                image:  "img/objects/zeshoek.svg",
                alt:    "Zeshoek"
            },
            {
                image:  "img/objects/chick4.svg",
                alt:    "Gewoon"
            },
            {
                image:  "img/objects/chick5.svg",
                alt:    "Davidster"
            },
            {
                image:  "img/objects/chick6.svg",
                alt:    "Rondje"
            },
            {
                image:  "img/objects/iambuddhabiath.svg",
                alt:    "Rondje"
            },
            {
                image:  "img/objects/yinyang.svg",
                alt:    "Rondje"
            }
        ];
    };
});

/*global Application, app, $ */
/*jslint browser: true, node: true, nomen: true, plusplus: true */
/**
 * The Payment Controller.<br>
 * Is able to fill the select boxes for the payment methods and banks.<br>
 * Also is able to handle the payment of the order.
 *
 * @see http://docs.angularjs.org/
 */
app.controller('PaymentCtrl', function ($scope, $location, $http, $resource) {
    "use strict";

    /**
     * Adds the methods and banks to the dropdown boxes.
     */
    $scope.addImageDropDowns = function () {
        this.addPaymentMethodDropdown();
        this.addPaymentBankDropdown();
    };

    /**
     * Uses the defined payment methods to fill the dropdown list of paymentmethods and sets it's style.
     *
     * @see http://designwithpc.com/Plugins/ddSlick
     */
    $scope.addPaymentMethodDropdown = function () {
        var paymentMethods = [
            {
                text: "Kies de betaal methode",
                value: 0,
                selected: true
            },
            {
                text: "iDeal",
                value: 1,
                selected: false,
                description: "Betalen met uw eigen bank",
                imageSrc: "http://94.210.234.160/_design_your_own/img/paymenticons/IDEAL.png"
            },
            {
                text: "Mastercard",
                value: 2,
                selected: false,
                description: "Betalen met Mastercard",
                imageSrc: "http://94.210.234.160/_design_your_own/img/paymenticons/Mastercard.png"
            },
            {
                text: "Paypal",
                value: 3,
                selected: false,
                description: "Betaal met uw Paypal-account",
                imageSrc: "http://94.210.234.160/_design_your_own/img/paymenticons/Paypal.png"
            },
            {
                text: "Visa",
                value: 4,
                selected: false,
                description: "Betalen met Visa",
                imageSrc: "http://94.210.234.160/_design_your_own/img/paymenticons/Visa.png"
            }
        ];

        //Makes the html valid. ddsslick or something wont allow the alt attribute to be set on the images.
        $('img').attr('alt', '');

        $('#paymentMethods').ddslick({
            data: paymentMethods,
            width: 250,
            selectText: "Selecteer een betaal methode",
            imagePosition: "left",
            onSelected: function (data) {
                if (data.selectedData.value === 1) {
                    $("#paymentBanks").show();
                    $scope.disableOrEnablePaymentButton(true);
                } else if (data.selectedData.value === 0) {
                    $("#paymentBanks").hide();
                    $scope.disableOrEnablePaymentButton(true);
                } else {
                    $("#paymentBanks").hide();
                    $scope.disableOrEnablePaymentButton(false);
                }
            }
        });
    };

    /**
     * Uses the defined banks to fill the dropdown list of the banks and sets the style
     *
     * @see http://designwithpc.com/Plugins/ddSlick
     */
    $scope.addPaymentBankDropdown = function () {
        var paymentBanks = [
            {
                text: "Kies uw bank",
                value: 0,
                selected: true
            },
            {
                text: "Rabobank",
                value: 1,
                selected: false,
                imageSrc: "http://94.210.234.160/_design_your_own/img/paymenticons/Rabobank.png"
            },
            {
                text: "ABN Amro",
                value: 2,
                selected: false,
                imageSrc: "http://94.210.234.160/_design_your_own/img/paymenticons/ABNAMBRO.png"
            },
            {
                text: "ING",
                value: 3,
                selected: false,
                imageSrc: "http://94.210.234.160/_design_your_own/img/paymenticons/ING.png"
            },
            {
                text: "ASN",
                value: 4,
                selected: false,
                imageSrc: "http://94.210.234.160/_design_your_own/img/paymenticons/ASN.png"
            },
            {
                text: "SNS Reaal",
                value: 5,
                selected: false,
                imageSrc: "http://94.210.234.160/_design_your_own/img/paymenticons/Sns.png"
            },
            {
                text: "Fortis",
                value: 6,
                selected: false,
                imageSrc: "http://94.210.234.160/_design_your_own/img/paymenticons/Fortis.png"
            },
            {
                text: "Triodos",
                value: 7,
                selected: false,
                imageSrc: "http://94.210.234.160/_design_your_own/img/paymenticons/Triodos Bank.png"
            }
        ];

        //Make it valid. ddsslick or something wont allow the alt.
        $('img').attr('alt', '');

        $('#paymentBanks').ddslick({
            data: paymentBanks,
            width: 250,
            selectText: "Selecteer een betaal methode",
            imagePosition: "left",
            onSelected: function (data) {
                if (data.selectedData.value === 0) {
                    $scope.disableOrEnablePaymentButton(true);
                } else {
                    $scope.disableOrEnablePaymentButton(false);
                }
            }
        });
        $('#paymentBanks').hide();
    };

    /**
     * Enables or disables the payment button according to the selection in the payment methods dropdown list
     * and banks dropdown list
     * @param disable
     */
    $scope.disableOrEnablePaymentButton = function (disable) {
        var toPaymentButton = document.getElementById("toPayment");
        if (!disable) {
            toPaymentButton.disabled = false;
            toPaymentButton.classList.remove("disabled");
        } else {
            toPaymentButton.disabled = true;
            toPaymentButton.classList.add("disabled");
        }
    };

    /**
     * Handles the payment of the given order.
     * First it checks if the user exists, if it's not it shows a message that the user is not logged in.
     * Then it checks if an order exists, if it's not it shows a message that the user has to order something.
     * After that it sets the required attributes of the order.
     *
     * Then it creates a required with the given $resource service and saves the order with the given order.
     * If the request is succesfull the user will be told and redirected.
     *
     * @see http://docs.angularjs.org/api/ngResource.$resource
     */
    $scope.pay = function () {
        var user = JSON.parse(window.sessionStorage.loggedInUser),
            order = JSON.parse(window.localStorage.Order),
            Order,
            index;


        if (user !== undefined) {
            if (order !== undefined) {
                order.user = user._id;
                for (index = 0; index < order.orderlines.length; index++) {
                    if (order.orderlines[index].aantal !== undefined) {
                        order.orderlines[index].amount = order.orderlines[index].aantal;
                        delete order.orderlines[index].aantal;
                    }
                    if (order.orderlines[index].caseDesign !== undefined) {
                        order.orderlines[index].caseDesign = order.orderlines[index].caseDesign._id;
                    }
                }

                Order = $resource('http://autobay.tezzt.nl\\:43083/orders', {},
                    {charge: {method: 'POST', params: {charge: true}}}
                );

                order = new Order(order);
                order.$save(function (data) {
                    if (data.error === null) {
                        Application.notify('ok', 'Bestelling is geplaatst.');
                        delete window.localStorage.Order;
                        $location.path("#/betalen/geslaagd");
                    } else {
                        Application.notify('error', 'Bestelling is niet geplaatst.');
                    }
                });
            } else {
                Application.notify('error', 'U heeft geen bestellingen geplaatst.');
            }
        } else {
            Application.notify('error', 'U moet ingelogd zijn om iets te bestellen.');
        }
    };
});

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

/*global Application, app, $ */
/*jslint browser: true, node: true, nomen: true, plusplus: true */
/**
 * The Shop Cart Controller.<br>
 * Handles events on the shopcart page and is able to edit the amount of an orderline.<br>
 * Also is able to remove a product out of the order.<br>
 * And at last it can redirect the user to the payment page.
 */
app.controller('ShopCartCtrl', function ($scope, $location) {
    "use strict";

    /**
     * Loads the designs (Order) that are located in the localstorage if it exists.
     * If it exists the $scope.order attributes will be set with the information of the localstorage
     *
     */
    $scope.loadShopCartDesigns = function () {
        var order,
            index;

        if (window.localStorage.Order) {
            order = JSON.parse(window.localStorage.Order);
            $scope.order = {
                orderlines: []
            };

            for (index = 0; index < order.orderlines.length; index++) {
                order.orderlines[index].aantal = $scope.validateAmount(order.orderlines[index].aantal);
                $scope.order.orderlines.push(
                    {
                        caseDesign: order.orderlines[index].caseDesign,
                        aantal: order.orderlines[index].aantal
                    }
                );
            }
        }
    };

    /**
     * Validates the amount and returns 1 if it's not a valid number.<br>
     * Else it will return just the amount.
     * @param amount the given amount
     * @returns {Number}
     */
    $scope.validateAmount = function (amount) {
        if (isNaN(amount) || amount <= 0) {
            return 1;
        }
        return amount;
    };

    /**
     * Executed when the user changes the amount.<br>
     * This function saves the new amount to the localstorage and calculates the new totalprice.
     * @param caseDesign the design
     * @param input the input, type is number
     */
    $scope.changeAmount = function (caseDesign, input) {
        var shopCartDesigns,
            amount,
            order,
            index;

        if (window.localStorage.Order) {
            shopCartDesigns = JSON.parse(window.localStorage.Order);
            amount = 0;
            order = {
                orderlines: []
            };

            for (index = 0; index < shopCartDesigns.orderlines.length; index++) {
                amount = shopCartDesigns.orderlines[index].aantal;

                if (shopCartDesigns.orderlines[index].caseDesign._id === caseDesign._id) {
                    amount = input.orderline.aantal;
                }

                order.orderlines[index] = {
                    caseDesign: shopCartDesigns.orderlines[index].caseDesign,
                    aantal: amount
                };
            }
            window.localStorage.Order = JSON.stringify(order);
            $scope.calculateTotalPrice();
        }
    };

    /**
     * Removes the product in the variable Order in the localstorage.
     * The user will be notified if the product is removed.
     * @param caseDesignId
     */
    $scope.removeProduct = function (caseDesignId) {
        var order,
            index;

        if (window.localStorage.Order) {
            order = JSON.parse(window.localStorage.Order);

            for (index = 0; index < order.orderlines.length; index++) {
                if (caseDesignId === order.orderlines[index].caseDesign._id) {
                    $scope.order.orderlines.splice(index, 1);
                    order.orderlines.splice(index, 1);

                    Application.notify('ok', 'Product is verwijderd.');
                    break;
                }
            }

            if (order.orderlines.length === 0) {
                window.localStorage.removeItem('Order');
                $scope.order = null;
            } else {
                window.localStorage.Order = JSON.stringify(order);
            }

            $scope.calculateTotalPrice();
        }
    };

    /**
     * Calculates the totalprice according to the orderlines atribute in the model order in the $scope.
     */
    $scope.calculateTotalPrice = function () {
        var index;

        $scope.totalPrice = 0;

        if ($scope.order !== undefined && $scope.order !== null) {
            if ($scope.order.orderlines.length !== 0) {
                for (index = 0; index < $scope.order.orderlines.length; index++) {
                    $scope.totalPrice += $scope.order.orderlines[index].aantal * 7.5;
                }
            }
        }
    };

    /**
     * Loads the payment methods page if the user is logged in.<br>
     * Before it loads the page it checks if the address information is known and
     * if the amount filled in at the amount inputs is valid.<br>
     * Then it loads the payment page.<br>
     */
    $scope.loadPaymentMethods = function () {
        var user,
            input;

        if (window.sessionStorage.loggedInUser) {
            user = JSON.parse(window.sessionStorage.loggedInUser);

            if (user.address !== undefined) {
                if ($scope.totalPrice !== null && $scope.totalPrice !== undefined && !(isNaN($scope.totalPrice))) {
                    $location.path('/betalen/kiezen');
                } else {
                    Application.notify('error', 'Er is een verkeerd aantal ingevuld bij een product.');
                }
            } else {
                Application.notify('error', 'Geen adresgegevens bekend.');
                input = document.getElementById("nawForm").getElementsByClassName("input-medium")[1];
                input.focus();
            }
        } else {
            Application.notify('error', 'U bent niet ingelogd.');
        }
    };

    $scope.continueShopping = function () {
        $location.path('/producten');
    };
});

/*global Application, app, $ */
/*jslint browser: true, node: true, nomen: true, plusplus: true */
/**
 * The User Controller<br>
 * Is able to log in, logout and register a user.<br>
 * Also is able to retrieve user information for various pages.
 *
 * @see http://docs.angularjs.org/
 */
app.controller('UserCtrl', function ($scope, $location, $http, $resource) {
    "use strict";
    /**
     * This function will login the user by a post request created with the given $resource service.<br>
     * In the callback the user will be notified is he logged in or not and his information is saved to the session.
     *
     * @see http://docs.angularjs.org/api/ngResource.$resource
     */
    $scope.loginUser = function () {
        var User, user;

        User = $resource('http://autobay.tezzt.nl\\:43083/signin', {},
            {
                charge: {
                    method: 'POST',
                    params: {
                        charge: true
                    }
                }
            }
        );

        user = new User($scope.user);
        user.$save(function (data) {
            if (data.error !== null) {
                Application.notify('error', data.error);
            } else if (data.result.name === $scope.user.username) {
                window.sessionStorage.loggedInUser = JSON.stringify(data.result);
                $scope.hasUser = true;
                $scope.user.name = data.result.name;
                Application.notify('ok', 'Je bent succesvol ingelogd.');
            }
        });
    };

    /**
     * Logs out user by performing a GET request created with the given $resource service.<br>
     * In the callback the user will be notified is he's logged out or not.<br>
     * The user will be redirected to the home page to prevent the user doing any actions that may not be done
     * if you're not logged in.
     */
    $scope.logoutUser = function () {
        var User = $resource('http://autobay.tezzt.nl\\:43083/signout', {},
            {charge: {method: 'GET', params: {charge: true}}}
        );

        User.get(function (data) {
            if (data.error === null) {
                Application.notify('ok', 'Succesvol uitgelogd.');
                window.sessionStorage.removeItem("loggedInUser");
                $scope.hasUser = false;
                $location.path('/');
                $scope.user.password = '';
            } else {
                Application.notify('error', 'U bent niet uitgelogd, er is iets misgegaan.');
            }
        });
    };

    /**
     * Creates a new user by posting to the server with the created request with the $resource service.<br>
     * If all values are valid the user will be saved and notified. Else the user is notified his account is not saved.
     */
    $scope.registerUser = function () {
        var User, user;

        User = $resource('http://autobay.tezzt.nl\\:43083/users', {},
            {charge: {method: 'POST', params: {charge: true}}}
        );

        user = new User($scope.user);
        user.$save(function (data) {
            if (data.error === null) {
                Application.notify('ok', 'Account is succesvol aangemaakt.');
                $location.path("/");
            } else {
                Application.notify('error', 'Account is niet aangemaakt, er is iets misgegaan');
            }
        });
    };

    /**
     * This function will check if the user data is filled in right.
     * If not a param will be set to true so the submit button is disabled.
     */
    $scope.checkRegister = function () {
        $scope.user.check = false;
        $scope.user.passCheck = true;

        if ($scope.user.name === '' || $scope.user.name === undefined) {
            $scope.user.check = true;
        }

        if ($scope.user.firstName === '' || $scope.user.firstName === undefined) {
            $scope.user.check = true;
        }

        if ($scope.user.lastName === '' || $scope.user.lastName === undefined) {
            $scope.user.check = true;
        }

        if ($scope.user.dateOfBirth === '' || $scope.user.dateOfBirth === undefined) {
            $scope.user.check = true;
        }

        if($scope.user.password !== $scope.user.passwordCheck || $scope.user.password === ''){
            if ($scope.user.passwordCheck === '' || $scope.user.password === undefined || $scope.user.passwordCheck === undefined) {
                $scope.user.check = true;
            }
        }

        if ($scope.user.password !== '' && $scope.user.passwordCheck !== '' && $scope.user.password !== $scope.user.passwordCheck) {
            $scope.user.passCheck = false;
        }
    };

    /**
     * Check if the user is logged in, this is checking if exists in the sessionstorage.
     */
    $scope.checkLoggedInUser = function () {
        if (window.sessionStorage.loggedInUser !== undefined) {
            $scope.hasUser = true;
            $scope.user = JSON.parse(window.sessionStorage.loggedInUser);
        } else {
            $scope.hasUser = false;
        }
    };

    /**
     * This will get the user out of the storage and will get the right user info.
     */
    $scope.loadUserShopCart = function () {
        var loggedInUser, User;

        if (window.sessionStorage.loggedInUser !== undefined) {
            loggedInUser = JSON.parse(window.sessionStorage.loggedInUser);

            User = $resource('http://autobay.tezzt.nl\\:43083/user/' + loggedInUser._id, {},
                {
                    charge: {
                        method: 'GET',
                        params: {
                            charge: true
                        }
                    }
                }
            );

            User.get(function (data) {
                $scope.user = data.result;
            });
        }
    };

    /**
     * This function will be save the user NAW information.<br>
     * First it creates a PUT request with the given $resource service.<br>
     * Then if the user is logged in it updates the NAW information of the user.<br>
     * In the callback the updated information will be saved to the sessionStorage and the user will be notified.
     */
    $scope.saveNawInformation = function () {
        var user, User;

        User = $resource('http://autobay.tezzt.nl\\:43083/user/:id',
            {
                id: "@_id"
            },
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        if (window.sessionStorage.loggedInUser) {
            user = new User($scope.user);
            user.$update(function (data) {
                if (data.error === null) {
                    Application.notify('ok', 'NAW gegevens zijn succesvol aangepast.');
                    window.sessionStorage.loggedInUser = JSON.stringify(data.result);
                } else {
                    Application.notify('error', 'NAW Gegevens zijn niet aangepast, er is iets misgegaan.');
                }
            });
        } else {
            Application.notify('error', 'U moet ingelogd zijn om uw gegevens aan te passen.');
        }
    };
});