app.controller('UserCtrl', function($scope, $location) {
    var path = '';

    $scope.loginUser = function() {
        $http.post('/someUrl', $scope.user).success(function(data) {
            if(data.error == null || data.data['login'] == true){
                path = '/';
            } else {
                path = '/gebruiker/login';
            }
            $location.path(path);
        });
    };

    $scope.registerUser = function() {
        $http.post('/someUrl', $scope.user).success(function(data) {
            if(data.error == null || data.data['registered'] == true){
                $location.path('/gebruiker/login');
            } else {
                // displayError(data.error);
            }


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