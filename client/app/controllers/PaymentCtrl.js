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