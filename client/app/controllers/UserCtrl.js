app.controller('UserCtrl', function($scope) {
    $scope.LoginUser = function() {
        //login($scope.user);
    };

    $scope.registerUser = function() {
        console.log($scope.user);
        if(checkRegister($scope)){
            console.log($scope.user);
            //register($scope.user);
        }
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
            $scope.user.passCheck = false;
        }
    };
});

