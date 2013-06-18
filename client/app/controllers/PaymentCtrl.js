app.controller('PaymentCtrl', function ($scope, $location, $http, $resource) {
    "use strict";

    $scope.addImageDropDowns = function () {
        this.addPaymentMethodDropdown();
        this.addPaymentBankDropdown();
    };

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

        //Make it valid. ddsslick or something wont allow the alt.
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

    $scope.pay = function () {
        var user = JSON.parse(window.sessionStorage.loggedInUser),
            order = JSON.parse(window.localStorage.Order),
            Order,
            i;


        if (user !== undefined) {
            if (order !== undefined) {
                order.user = user._id;
                for (i = 0; i < order.orderlines.length; i++) {
                    if (order.orderlines[i].aantal !== undefined) {
                        order.orderlines[i].amount = order.orderlines[i].aantal;
                        delete order.orderlines[i].aantal;
                    }
                    if (order.orderlines[i].caseDesign !== undefined) {
                        order.orderlines[i].caseDesign = order.orderlines[i].caseDesign._id;
                    }
                }

                Order = $resource('http://autobay.tezzt.nl\\:43083/orders', {},
                    {charge: {method: 'POST', params: {charge: true}}}
                );

                order = new Order(order);
                order.$save(function (data) {
                    if (data.error === null) {
                        Application.notify('ok', 'Bestelling is geplaatst.');
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