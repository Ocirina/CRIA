var app = angular.module('design_your_own', ['ngResource']);

app.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            controller: 'IndexCtrl',
            templateUrl: 'app/partials/index.html'
        })

        //gallery
        .when('/producten', {
            controller: 'ProductCtrl',
            templateUrl: 'app/partials/products/gallery.html'
        })

        .when('/product/:id', {
            controller: 'ProductCtrl',
            templateUrl: 'app/partials/products/product.html'
        })

        .when('/winkelwagen', {
            templateUrl: 'app/partials/shoppingcart/shoppingcart.html'
        })

        .when('/betalen/kiezen', {
            templateUrl: 'app/partials/payment/methods.html'
        })

        //Design
        .when('/ontwerpen', {
            controller: 'DesignCtrl',
            templateUrl: 'app/partials/design/design.html'
        })

        //User login and register
        .when('/gebruiker/registreren', {
            controller: 'UserCtrl',
            templateUrl: 'app/partials/user/register.html'
        })

        .when('/gebruiker/wachtwoordvergeten', {
            controller: 'UserCtrl',
            templateUrl: 'app/partials/user/wachtwoordvergeten.html'
        })

        .otherwise({ redirectTo: '/' });
});