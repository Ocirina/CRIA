/*global Application, app, $ */
/*jslint browser: true, node: true, nomen: true, plusplus: true */
app.controller('ShopCartCtrl', function ($scope, $location, $http, $resource) {
    "use strict";

    $scope.loadShopCartDesigns = function () {
        var order,
            i;

        if (window.localStorage.Order) {
            order = JSON.parse(window.localStorage.Order);
            $scope.order = {
                orderlines: []
            };

            for (i = 0; i < order.orderlines.length; i++) {
                order.orderlines[i].aantal = $scope.getAmount(order.orderlines[i].aantal);
                $scope.order.orderlines.push(
                    {
                        caseDesign: order.orderlines[i].caseDesign,
                        aantal: order.orderlines[i].aantal
                    }
                );
            }
        }
    };

    $scope.getAmount = function (amount) {
        if (isNaN(amount) || amount <= 0) {
            return 1;
        }
        return amount;
    };

    $scope.changeAmount = function (caseDesign, input) {
        var shopCartDesigns,
            amount,
            order,
            i;

        if (window.localStorage.Order) {
            shopCartDesigns = JSON.parse(window.localStorage.Order);
            amount = 0;
            order = {
                orderlines: []
            };

            for (i = 0; i < shopCartDesigns.orderlines.length; i++) {
                amount = shopCartDesigns.orderlines[i].aantal;

                if (shopCartDesigns.orderlines[i].caseDesign._id === caseDesign._id) {
                    amount = input.orderline.aantal;
                }

                order.orderlines[i] = {
                    caseDesign: shopCartDesigns.orderlines[i].caseDesign,
                    aantal: amount
                };
            }
            window.localStorage.Order = JSON.stringify(order);
            $scope.calculateTotalPrice();
        }
    };

    $scope.removeProduct = function (caseDesignId) {
        var order,
            i;

        if (window.localStorage.Order) {
            order = JSON.parse(window.localStorage.Order);

            for (i = 0; i < order.orderlines.length; i++) {
                if (caseDesignId === order.orderlines[i].caseDesign._id) {
                    $scope.order.orderlines.splice(i, 1);
                    order.orderlines.splice(i, 1);

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

    $scope.calculateTotalPrice = function () {
        var i;

        $scope.totalPrice = 0;

        if ($scope.order !== undefined && $scope.order !== null) {
            if ($scope.order.orderlines.length !== 0) {
                for (i = 0; i < $scope.order.orderlines.length; i++) {
                    $scope.totalPrice += $scope.order.orderlines[i].aantal * 7.5;
                }
            }
        }
    };


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
