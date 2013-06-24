/*global Application, app, $ */
/*jslint browser: true, node: true, nomen: true, plusplus: true */
/**
 * The User Controller<br>
 * Is able to log in, logout and register a user.<br>
 * Also is able to retrieve user information for various pages.
 *
 * @see http://docs.angularjs.org/
 */
app.controller('UserCtrl', function ($scope, $location, $http, $resource) {
    "use strict";
    /**
     * This function will login the user by a post request created with the given $resource service.<br>
     * In the callback the user will be notified is he logged in or not and his information is saved to the session.
     *
     * @see http://docs.angularjs.org/api/ngResource.$resource
     */
    $scope.loginUser = function () {
        var User, user;

        User = $resource('http://autobay.tezzt.nl\\:43083/signin', {},
            {
                charge: {
                    method: 'POST',
                    params: {
                        charge: true
                    }
                }
            }
        );

        user = new User($scope.user);
        user.$save(function (data) {
            if (data.error !== null) {
                Application.notify('error', data.error);
            } else if (data.result.name === $scope.user.username) {
                window.sessionStorage.loggedInUser = JSON.stringify(data.result);
                $scope.hasUser = true;
                $scope.user.name = data.result.name;
                Application.notify('ok', 'Je bent succesvol ingelogd.');
            }
        });
    };

    /**
     * Logs out user by performing a GET request created with the given $resource service.<br>
     * In the callback the user will be notified is he's logged out or not.<br>
     * The user will be redirected to the home page to prevent the user doing any actions that may not be done
     * if you're not logged in.
     */
    $scope.logoutUser = function () {
        var User = $resource('http://autobay.tezzt.nl\\:43083/signout', {},
            {charge: {method: 'GET', params: {charge: true}}}
        );

        User.get(function (data) {
            if (data.error === null) {
                Application.notify('ok', 'Succesvol uitgelogd.');
                window.sessionStorage.removeItem("loggedInUser");
                $scope.hasUser = false;
                $location.path('/');
                $scope.user.password = '';
            } else {
                Application.notify('error', 'U bent niet uitgelogd, er is iets misgegaan.');
            }
        });
    };

    /**
     * Creates a new user by posting to the server with the created request with the $resource service.<br>
     * If all values are valid the user will be saved and notified. Else the user is notified his account is not saved.
     */
    $scope.registerUser = function () {
        var User, user;

        User = $resource('http://autobay.tezzt.nl\\:43083/users', {},
            {charge: {method: 'POST', params: {charge: true}}}
        );

        user = new User($scope.user);
        user.$save(function (data) {
            if (data.error === null) {
                Application.notify('ok', 'Account is succesvol aangemaakt.');
                $location.path("/");
            } else {
                Application.notify('error', 'Account is niet aangemaakt, er is iets misgegaan');
            }
        });
    };

    /**
     * This function will check if the user data is filled in right.
     * If not a param will be set to true so the submit button is disabled.
     */
    $scope.checkRegister = function () {
        $scope.user.check = false;
        $scope.user.passCheck = true;

        if ($scope.user.name === '' || $scope.user.name === undefined) {
            $scope.user.check = true;
        }

        if ($scope.user.firstName === '' || $scope.user.firstName === undefined) {
            $scope.user.check = true;
        }

        if ($scope.user.lastName === '' || $scope.user.lastName === undefined) {
            $scope.user.check = true;
        }

        if ($scope.user.dateOfBirth === '' || $scope.user.dateOfBirth === undefined) {
            $scope.user.check = true;
        }

        if($scope.user.password !== $scope.user.passwordCheck || $scope.user.password === ''){
            if ($scope.user.passwordCheck === '' || $scope.user.password === undefined || $scope.user.passwordCheck === undefined) {
                $scope.user.check = true;
            }
        }

        if ($scope.user.password !== '' && $scope.user.passwordCheck !== '' && $scope.user.password !== $scope.user.passwordCheck) {
            $scope.user.passCheck = false;
        }
    };

    /**
     * Check if the user is logged in, this is checking if exists in the sessionstorage.
     */
    $scope.checkLoggedInUser = function () {
        if (window.sessionStorage.loggedInUser !== undefined) {
            $scope.hasUser = true;
            $scope.user = JSON.parse(window.sessionStorage.loggedInUser);
        } else {
            $scope.hasUser = false;
        }
    };

    /**
     * This will get the user out of the storage and will get the right user info.
     */
    $scope.loadUserShopCart = function () {
        var loggedInUser, User;

        if (window.sessionStorage.loggedInUser !== undefined) {
            loggedInUser = JSON.parse(window.sessionStorage.loggedInUser);

            User = $resource('http://autobay.tezzt.nl\\:43083/user/' + loggedInUser._id, {},
                {
                    charge: {
                        method: 'GET',
                        params: {
                            charge: true
                        }
                    }
                }
            );

            User.get(function (data) {
                $scope.user = data.result;
            });
        }
    };

    /**
     * This function will be save the user NAW information.<br>
     * First it creates a PUT request with the given $resource service.<br>
     * Then if the user is logged in it updates the NAW information of the user.<br>
     * In the callback the updated information will be saved to the sessionStorage and the user will be notified.
     */
    $scope.saveNawInformation = function () {
        var user, User;

        User = $resource('http://autobay.tezzt.nl\\:43083/user/:id',
            {
                id: "@_id"
            },
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        if (window.sessionStorage.loggedInUser) {
            user = new User($scope.user);
            user.$update(function (data) {
                if (data.error === null) {
                    Application.notify('ok', 'NAW gegevens zijn succesvol aangepast.');
                    window.sessionStorage.loggedInUser = JSON.stringify(data.result);
                } else {
                    Application.notify('error', 'NAW Gegevens zijn niet aangepast, er is iets misgegaan.');
                }
            });
        } else {
            Application.notify('error', 'U moet ingelogd zijn om uw gegevens aan te passen.');
        }
    };
});