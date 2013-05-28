var app = angular.module('design_your_own', []);

app.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            controller: 'IndexCtrl',
            templateUrl: 'app/partials/index.html'
        })

        //User login and register
        .when('/gebruiker/registreren', {
            controller: 'UserCtrl',
            templateUrl: 'app/partials/register.html'
        })

        .when('/gebruiker/login', {
            controller: 'UserCtrl',
            templateUrl: 'app/partials/login.html'
        })

        .otherwise({ redirectTo: '/' });
});