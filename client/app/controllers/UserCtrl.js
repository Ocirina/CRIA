app.controller('UserCtrl', function($scope, $location, $http, $resource) {
    /**
     * This function will login the user by an post request. The server will return true or not.
     * The whole user object is send away to verify if the user is real.
     */
    $scope.loginUser = function() {
        var User = $resource('http://autobay.tezzt.nl\\:43083/signin',{},
            {charge: {method:'POST', params:{charge:true}}}
        );

        var user = new User($scope.user);
        user.$save(function(data) {
            if(data.error !== null){
                Application.notify('error', data.error);
            } else if(data.result.name === $scope.user.username) {
                window.sessionStorage["loggedInUser"] = JSON.stringify(data.result);
                $scope.hasUser = true;
                Application.notify('ok', 'Je bent succesvol ingelogd.');
            }
        });
    };

    /**
     * Logs out user, hasUser will be set on false and the the user is removed from the sessionStorage.
     */
    $scope.logoutUser = function() {
        window.sessionStorage.removeItem("loggedInUser");
        $scope.hasUser = false;
    };

    /**
     * This function will post the user to the server. The server will check if the user can be added.
     * If all values are correct the user will be added.
     */
    $scope.registerUser = function() {
        var User = $resource('http://autobay.tezzt.nl\\:43083/users',{},
          {charge: {method:'POST', params:{charge:true}}}
        );

        var user = new User($scope.user);
        user.$save(function(data) {
            if(data.error !== null){
                Application.notify('ok', 'Account is succesvol aangemaakt.');
            }
            // callback
            // feedback voor registreren hier!
        });
    };

    /**
     * This function will check if the user data is filled in right.
     * If not a param will be set to true so the submit button is disabled.
     */
    $scope.checkRegister = function(){
        $scope.user.check = false;
        $scope.user.passCheck = true;

        if($scope.user.name === '' || $scope.user.name === undefined){
            $scope.user.check = true;
        }

        if($scope.user.firstName === '' || $scope.user.firstName === undefined){
            $scope.user.check = true;
        }

        if($scope.user.lastName === '' || $scope.user.lastName === undefined){
            $scope.user.check = true;
        }

        if($scope.user.dateOfBirth === '' || $scope.user.dateOfBirth === undefined){
            $scope.user.check = true;
        }

        if($scope.user.password !== $scope.user.passwordCheck || $scope.user.password === '' && $scope.user.passwordCheck === '' || $scope.user.password == undefined || $scope.user.passwordCheck == undefined){
            $scope.user.check = true;
        }

        if($scope.user.password != '' && $scope.user.passwordCheck != '' && $scope.user.password !== $scope.user.passwordCheck){
            $scope.user.passCheck = false;
        }
    };

//
//     This function does redirect the user after getting logged in or not.
//
//    $scope.forgotPassword = function() {
//        $http.post('/someUrl', $scope.user).success(function(data) {
//            if(data.error == null || data.data['login'] == true){
//                $location.path('/');
//            } else {
//                $location.path('/gebruiker/login');
//            }
//        });
//    };

    /**
     * Check if the user is logged in, this is done by the sessionStorage.
     */
    $scope.checkLoggedInUser = function() {
        if(window.sessionStorage['loggedInUser'] != undefined) {
            $scope.hasUser = true;
            $scope.user = JSON.parse(window.sessionStorage["loggedInUser"]);
        } else {
            $scope.hasUser = false;
        }
    };

    /**
     * This will get the user out of the storage and will get the right user info.
     */
    $scope.loadUserShopCart = function() {
        var loggedInUser = JSON.parse(window.sessionStorage["loggedInUser"]);

        var User = $resource('http://autobay.tezzt.nl\\:43083/user/' + loggedInUser["_id"],{},
            {charge: {method:'GET', params:{charge:true}}}
        );

        User.get(function(data) {
            $scope.user = data.result;
        });
    };

    /**
     * This function will be save the user NAW information. This is done by a PUT request.
     */
    $scope.saveNawInformation = function() {
        var User = $resource('http://autobay.tezzt.nl\\:43083/user/:id',{ id:"@_id"},
           {update: {method:'PUT'}}
        );

        var user = new User($scope.user);
        user.$update(function(data) {
            if(data.error !== null){
                Application.notify('ok', 'NAW gegevens zijn succesvol aangepast.');
            }
            // callback
            // Feedback voor wijzigen N.A.W. gegevens hier!
        });
    }
});