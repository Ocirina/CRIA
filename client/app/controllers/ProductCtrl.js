app.controller('ProductCtrl', function($scope, casedesigns) {
    casedesigns.get(function(data){
         console.log(data);
    });
});
