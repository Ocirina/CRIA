var app = angular.module('design_your_own', []);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'IndexCtrl',
            templateUrl: 'app/partials/index.html'
        })
        .when('/user', {
            controller: 'UserCtrl',
            templateUrl: 'app/partials/index.html'
        })
        .otherwise({ redirectTo: '/' });
});