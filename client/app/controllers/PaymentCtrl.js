app.controller('PaymentCtrl', function($scope, $location, $http, $resource) {
    $scope.addImageDropDowns = function() {
        this.addPaymentMethodDropdown();
        this.addPaymentBankDropdown();
    };

    $scope.addPaymentMethodDropdown = function() {
        var paymentMethods = [
            {
                value: 0,
                selected: true,
                description: "Kies de betaal methode"
            },
            {
                text: "iDeal",
                value: 1,
                selected: false,
                description: "Betalen met uw eigen bank",
                imageSrc: "http://dl.dropbox.com/u/40036711/Images/facebook-icon-32.png"
            },
            {
                text: "Mastercard",
                value: 2,
                selected: false,
                description: "Betalen met Mastercard",
                imageSrc: "http://dl.dropbox.com/u/40036711/Images/twitter-icon-32.png"
            },
            {
                text: "Paypal",
                value: 3,
                selected: false,
                description: "Betaal met uw Paypal-account",
                imageSrc: "http://dl.dropbox.com/u/40036711/Images/linkedin-icon-32.png"
            },
            {
                text: "Visa",
                value: 4,
                selected: false,
                description: "Betalen met Visa",
                imageSrc: "http://dl.dropbox.com/u/40036711/Images/foursquare-icon-32.png"
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
                } else {
                    $("#paymentBanks").hide();
                }
            }
        });
    };

    $scope.addPaymentBankDropdown = function() {
        var paymentBanks = [
            {
                value: 0,
                selected: true,
                description: "Kies uw bank",
            },
            {
                value: 1,
                selected: false,
                description: "Rabobank",
                imageSrc: "http://dl.dropbox.com/u/40036711/Images/facebook-icon-32.png"
            },
            {
                text: "ABN Amro",
                value: 2,
                selected: false,
                imageSrc: "http://dl.dropbox.com/u/40036711/Images/twitter-icon-32.png"
            },
            {
                text: "ING",
                value: 3,
                selected: false,
                imageSrc: "http://dl.dropbox.com/u/40036711/Images/linkedin-icon-32.png"
            },
            {
                text: "ASN",
                value: 4,
                selected: false,
                imageSrc: "http://dl.dropbox.com/u/40036711/Images/foursquare-icon-32.png"
            },
            {
                text: "SNS Reaal",
                value: 5,
                selected: false,
                imageSrc: "http://dl.dropbox.com/u/40036711/Images/foursquare-icon-32.png"
            },
            {
                text: "Fortis",
                value: 6,
                selected: false,
                description: "Betaal met American Express",
                imageSrc: "http://dl.dropbox.com/u/40036711/Images/foursquare-icon-32.png"
            },
            {
                text: "Triodos",
                value: 7,
                selected: false,
                imageSrc: "http://dl.dropbox.com/u/40036711/Images/foursquare-icon-32.png"
            },
            {
                text: "Friesland Bank",
                value: 8,
                selected: false,
                imageSrc: "http://dl.dropbox.com/u/40036711/Images/foursquare-icon-32.png"
            }
        ];

        $('#paymentBanks').ddslick({
            data:paymentBanks,
            width:300,
            selectText: "Selecteer een betaal methode",
            imagePosition:"left",
            onSelected: function(data){

            }
        });


        $('#paymentBanks').hide();
    }
});