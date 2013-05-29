app.controller('UserCtrl', function($scope, $location) {
    $scope.LoginUser = function() {
        $http.post('/someUrl', $scope.user).success(function() {
            // User information correct
            $location.path( "/" );
        });
    };

    $scope.registerUser = function() {
        $http.post('/someUrl', $scope.user).success(function() {
            //register($scope.user);
            $location.path( "/gebruiker/login" );
        });
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

        if($scope.user.birthDate === '' || $scope.user.birthDate === undefined){
            $scope.user.check = true;
        }

        if($scope.user.password !== $scope.user.passwordCheck || $scope.user.password === '' && $scope.user.passwordCheck === '' || $scope.user.password == undefined || $scope.user.passwordCheck == undefined){
            $scope.user.check = true;
        }

        if($scope.user.password != '' && $scope.user.passwordCheck != '' && $scope.user.password !== $scope.user.passwordCheck){
            $scope.user.passCheck = false;
        }
    };
});

