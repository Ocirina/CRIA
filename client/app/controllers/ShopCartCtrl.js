app.controller('ShopCartCtrl', function($scope, $location, $http, $resource) {
    $scope.loadShopCartDesigns = function() {
        if(window.localStorage['Order']) {
            var order = JSON.parse(window.localStorage['Order']);
            $scope.order = {
                orderlines: []
            };

            for(var i = 0; i < order.orderlines.length; i++) {
                $scope.order.orderlines.push({caseDesign:order.orderlines[i]["caseDesign"], aantal: order.orderlines[i]["aantal"]});
            }
        }
    };

    $scope.changeAmount = function(caseDesign, input){
        if(window.localStorage['Order']) {
            var shopCartDesigns = JSON.parse(window.localStorage['Order']);
            var amount = 0, order = {
                orderlines: []
            };

            for(var i = 0; i < shopCartDesigns.orderlines.length; i++) {
                amount = shopCartDesigns.orderlines[i]["aantal"];

                if(shopCartDesigns.orderlines[i].caseDesign._id === caseDesign._id){
                    amount = input.orderline.aantal;
                }

                order.orderlines[i] = {caseDesign:shopCartDesigns.orderlines[i]["caseDesign"], aantal: amount};
            }
            window.localStorage['Order'] = JSON.stringify(order);
            $scope.calculateTotalPrice();
        }
    };

    $scope.removeProduct = function(caseDesignId) {
        if(window.localStorage['Order']) {
            var order = JSON.parse(window.localStorage['Order']);

            for(var i = 0; i < order.orderlines.length; i++) {
                if(caseDesignId === order.orderlines[i].caseDesign._id){
                    $scope.order.orderlines.splice(i, 1);
                    order.orderlines.splice(i,1)

                    Application.notify('ok', 'Product is verwijderd.');
                    break;
                }
            }

            if(order.orderlines.length === 0){
                window.localStorage.removeItem('Order');
                $scope.order = null;
            } else {
                window.localStorage['Order'] = JSON.stringify(order);
            }

            $scope.calculateTotalPrice();
        }
    };

    $scope.calculateTotalPrice = function() {
        $scope.totalPrice = 0;

        if($scope.order !== undefined && $scope.order !== null){
            if($scope.order.orderlines.length !== 0){
                for(var i = 0; i < $scope.order.orderlines.length; i++) {
                    $scope.totalPrice += $scope.order.orderlines[i].aantal * 7.5;
                }
            }
        }
    };


    $scope.loadPaymentMethods = function() {
        if(window.sessionStorage["loggedInUser"] ) {
            var user = JSON.parse(window.sessionStorage["loggedInUser"]);
            if(user.address != undefined) {
                console.log($scope.totalPrice);
                console.log(!(isNaN($scope.totalPrice)));
                if($scope.totalPrice !== null && $scope.totalPrice !== undefined && !(isNaN($scope.totalPrice))) {
                    $location.path('/betalen/kiezen');
                } else {
                    Application.notify('error', 'Er is een verkeerd aantal ingevuld bij een product.');
                }
            } else {
                Application.notify('error', 'Geen adresgegevens bekend.');
                var input = document.getElementById("nawForm").getElementsByClassName("input-medium")[1];
                input.focus();
            }
        } else {
            Application.notify('error', 'U bent niet ingelogd.');
        }
    };
});
