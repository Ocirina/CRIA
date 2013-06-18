/* global app, $, angular */
/*jslint browser: true, node: true, nomen: true, plusplus: true */
var app = angular.module('design_your_own', ['ngResource']);

app.config(function ($routeProvider) {
    "use strict";
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

        .when('/producten/user', {
            controller: 'ProductCtrl',
            templateUrl: 'app/partials/products/galerij_gebruiker.html'
        })

        .when('/producten/:userid', {
            controller: 'ProductCtrl',
            templateUrl: 'app/partials/products/gallery_differentUser.html'
        })

        .when('/product/:id', {
            controller: 'ProductCtrl',
            templateUrl: 'app/partials/products/product.html'
        })

        .when('/winkelwagen', {
            controller: 'ShopCartCtrl',
            templateUrl: 'app/partials/shoppingcart/shoppingcart.html'
        })

        .when('/betalen/kiezen', {
            controller: 'PaymentCtrl',
            templateUrl: 'app/partials/payment/methods.html'
        })

        .when('/betalen/geslaagd', {
            controller: 'PaymentCtrl',
            templateUrl: 'app/partials/payment/paymentSucceed.html'
        })

        //Footer

        .when('/faq', {
            templateUrl: 'app/partials/footer/faq.html'
        })

        .when('/over-ons', {
            templateUrl: 'app/partials/footer/over-ons.html'
        })

        //Design
        .when('/ontwerpen', {
            controller: 'DesignCtrl',
            templateUrl: 'app/partials/design/design.html'
        })

        .when("/ontwerpen/bewerken/:id", {
            controller: 'DesignCtrl',
            templateUrl: 'app/partials/design/designedit.html'
        })

        //User login and register
        .when('/gebruiker/registreren', {
            controller: 'UserCtrl',
            templateUrl: 'app/partials/user/register.html'
        })

        .when('/gebruiker/profiel', {
            controller: 'UserCtrl',
            templateUrl: 'app/partials/user/editprofile.html'
        })

        .when('/gebruiker/wachtwoordvergeten', {
            controller: 'UserCtrl',
            templateUrl: 'app/partials/user/wachtwoordvergeten.html'
        })

        .otherwise({ redirectTo: '/' });
});