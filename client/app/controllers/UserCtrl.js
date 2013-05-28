app.controller('UserCtrl', function($scope, $location) {
    $scope.LoginUser = function() {
        //login($scope.user);
    };

    $scope.registerUser = function() {
        $location.path( "/gebruiker/login" );
        //register($scope.user);
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

        if($scope.user.password !== $scope.user.passwordCheck || $scope.user.password === '' && $scope.user.passwordCheck === '' || $scope.user.password == undefined || $scope.user.passwordCheck == undefined){
            $scope.user.check = true;
        }

        if($scope.user.password != '' && $scope.user.passwordCheck != '' && $scope.user.password !== $scope.user.passwordCheck){
            $scope.user.passCheck = false;
        }
    };
});

