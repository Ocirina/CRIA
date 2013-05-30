app.controller('UserCtrl', function($scope, $location, $http, $resource) {
    $scope.loginUser = function() {
       $http.post('/users/signin', $scope.user).success(function(data) {
          console.log(data);
       })
    };

    $scope.registerUser = function() {
        var User = $resource('http://autobay.tezzt.nl:43083/users',{}, 
          {charge: {method:'POST', params:{charge:true}}}
        );
        var user1 = new User(JSON.stringify($scope.user));
        user1.$save();
        /*$http.post('http://autobay.tezzt.nl:43083/users', JSON.stringify($scope.user)).success(function(data) {
            if(data.error == null || data.data['registered'] == true){
                $location.path('/gebruiker/login');
            } else {
                // displayError(data.error);
            }
        });*/
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
});