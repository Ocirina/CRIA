app.controller('PaymentCtrl', function($scope, $location, $http, $resource) {
    $scope.addImageDropDowns = function() {
        this.addPaymentMethodDropdown();
        this.addPaymentBankDropdown();
    };

    $scope.addPaymentMethodDropdown = function() {
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
                imageSrc: "./img/paymenticons/IDEAL.png"
            },
            {
                text: "Mastercard",
                value: 2,
                selected: false,
                description: "Betalen met Mastercard",
                imageSrc: "./img/paymenticons/Mastercard.png"
            },
            {
                text: "Paypal",
                value: 3,
                selected: false,
                description: "Betaal met uw Paypal-account",
                imageSrc: "./img/paymenticons/Paypal.png"
            },
            {
                text: "Visa",
                value: 4,
                selected: false,
                description: "Betalen met Visa",
                imageSrc: "./img/paymenticons/Visa.png"
            }
        ];

        $('#paymentMethods').ddslick({
            data:paymentMethods,
            width:300,
            selectText: "Selecteer een betaal methode",
            imagePosition:"left",
            onSelected: function(data){
                if(data.selectedData.value == 1) {
                    $("#paymentBanks").show();
                    $scope.disableOrEnablePaymentButton(true);
                } else if(data.selectedData.value == 0) {
                    $("#paymentBanks").hide();
                    $scope.disableOrEnablePaymentButton(true);
                } else {
                    $("#paymentBanks").hide();
                    $scope.disableOrEnablePaymentButton(false);
                }
            }
        });
    };

    $scope.addPaymentBankDropdown = function() {
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
                imageSrc: "./img/paymenticons/Rabobank.png"
            },
            {
                text: "ABN Amro",
                value: 2,
                selected: false,
                imageSrc: "./img/paymenticons/ABNAMBRO.png"
            },
            {
                text: "ING",
                value: 3,
                selected: false,
                imageSrc: "./img/paymenticons/ING.png"
            },
            {
                text: "ASN",
                value: 4,
                selected: false,
                imageSrc: "./img/paymenticons/ASN.png"
            },
            {
                text: "SNS Reaal",
                value: 5,
                selected: false,
                imageSrc: "./img/paymenticons/Sns.png"
            },
            {
                text: "Fortis",
                value: 6,
                selected: false,
                imageSrc: "./img/paymenticons/Fortis.png"
            },
            {
                text: "Triodos",
                value: 7,
                selected: false,
                imageSrc: "./img/paymenticons/Triodos Bank.png"
            }
        ];

        $('#paymentBanks').ddslick({
            data:paymentBanks,
            width:300,
            selectText: "Selecteer een betaal methode",
            imagePosition:"left",
            onSelected: function(data){
                if(data.selectedData.value == 0) {
                    $scope.disableOrEnablePaymentButton(true);
                } else {
                    $scope.disableOrEnablePaymentButton(false);
                }
            }
        });
        $('#paymentBanks').hide();
    }

    $scope.disableOrEnablePaymentButton = function(disable) {
        var toPaymentButton = document.getElementById("toPayment");
        if(!disable) {
            toPaymentButton.disabled = false;
            toPaymentButton.classList.remove("disabled");
        } else {
            toPaymentButton.disabled = true;
            toPaymentButton.classList.add("disabled");
        }
    }

    $scope.pay = function() {

    }
});