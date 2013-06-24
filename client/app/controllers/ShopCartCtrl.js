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
