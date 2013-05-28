var app = angular.module('design_your_own', []);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller: 'IndexCtrl',
            templateUrl: 'src/main/partials/index.html'
        })

        .when('/user',
        {
            controller: 'UserCtrl',
            templateUrl: 'src/main/partials/index.html'
        })

        .otherwise({ redirectTo: '/' });
});