app.controller('UserCtrl', function($scope, $location, $http, $resource) {
    $scope.loginUser = function() {
        var User = $resource('http://autobay.tezzt.nl\\:43083/user/signin',{},
            {charge: {method:'POST', params:{charge:true}}}
        );

        var user = new User($scope.user);
        user.$save(function(data) {
            if(data.result.username === $scope.user.username) {
                window.sessionStorage["loggedInUser"] = JSON.stringify(data.result);
                $scope.hasUser = true;
            }
        });
    };

    $scope.logoutUser = function() {
        window.sessionStorage.removeItem("loggedInUser");
        $scope.hasUser = false;
    };

    $scope.registerUser = function() {
        var User = $resource('http://autobay.tezzt.nl\\:43083/users',{},
          {charge: {method:'POST', params:{charge:true}}}
        );

        var user = new User($scope.user);
        user.$save();
    };

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

    $scope.forgotPassword = function() {
        $http.post('/someUrl', $scope.user).success(function(data) {
            if(data.error == null || data.data['login'] == true){
                $location.path('/');
            } else {
                $location.path('/gebruiker/login');
            }
        });
    };

    $scope.checkLoggedInUser = function() {
        if(window.sessionStorage['loggedInUser'] != undefined) {
            $scope.hasUser = true;
            $scope.user = JSON.parse(window.sessionStorage["loggedInUser"]);
        } else {
            $scope.hasUser = false;
        }
    };

    $scope.loadUserShopCart = function() {
        var loggedInUser = JSON.parse(window.sessionStorage["loggedInUser"]);

        var User = $resource('http://autobay.tezzt.nl\\:43083/user/' + loggedInUser["_id"],{},
            {charge: {method:'GET', params:{charge:true}}}
        );

        User.get(function(data) {
            $scope.user = data.result;
        });
    };

    $scope.saveNawInformation = function() {
        var User = $resource('http://autobay.tezzt.nl\\:43083/user/:id',{ id:"@_id"},
           {update: {method:'PUT'}}
        );

        var user = new User($scope.user);
        user.$update();

        var Address = $resource('http://autobay.tezzt.nl\\:43083/address/' + loggedInUser["_id"],{},
            {charge: {method:'GET', params:{charge:true}}}
        );

    }
});