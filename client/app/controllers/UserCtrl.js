app.controller('UserCtrl', function($scope, $location, $http, $resource) {
    $scope.loginUser = function() {
        var User = $resource('http://autobay.tezzt.nl\\:43083/user/signin',{},
            {charge: {method:'POST', params:{charge:true}}}
        );

        var user = new User($scope.user);
        user.$save(function(data) {
            if(data.result.username === $scope.user.username) {
                window.sessionStorage["loggedInUser"] = data.result;
            }
        });
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
    }

    $scope.checkLoggedInUser = function() {
        if(window.sessionStorage['loggedInUser']) {
            $scope.hasUser = true;
        } else {
            $scope.hasUser = false;
        }
    };

    $scope.loadUserShopCart = function() {
        var User = $resource('http://autobay.tezzt.nl\\:43083/user/:id',{},
            {charge: {method:'GET', params:{charge:true}}}
        );

        var user = new User(window.sessionStorage["loggedInUser"]._id);
        user.get(function(data) {
            console.log(data);
        });
    }
});