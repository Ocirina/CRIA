app.controller('PaymentCtrl', function($scope, $location, $http, $resource) {
    $scope.addImageDropDowns = function() {

        var paymentMethods = [
            {
                text: "iDeal",
                value: 1,
                selected: true,
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
            },
            {
                text: "American Express",
                value: 5,
                selected: false,
                description: "Betaal met American Express",
                imageSrc: "http://dl.dropbox.com/u/40036711/Images/foursquare-icon-32.png"
            },
            {
                text: "Discover Network",
                value: 6,
                selected: false,
                description: "Betaal met het Discover Network",
                imageSrc: "http://dl.dropbox.com/u/40036711/Images/foursquare-icon-32.png"
            }];

        $('#paymentMethods').ddslick({
            data:paymentMethods,
            width:300,
            selectText: "Selecteer een betaal methode",
            imagePosition:"left",
            onSelected: function(selectedData){

            }
        });

    }
});