var app = angular.module('design_your_own', ['ngResource']);

app.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            controller: 'IndexCtrl',
            templateUrl: 'app/partials/index.html'
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