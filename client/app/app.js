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
            controller: 'ShopCartCtrl',
            templateUrl: 'app/partials/shoppingcart/shoppingcart.html'
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