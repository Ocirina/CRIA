app.factory('casedesigns', function ($http) {
  var yql = {};
  var url = 'http://autobay.tezzt.nl\\:43083/casedesigns/';

  return {
    get: function (callback) {
      $http.jsonp(url)
        .success(function (json) {
          var result = json.query.result;
          callback(result);
        })
        .error(function (error) {
          console.log(JSON.stringify(error))
        })
    }
}});

app.factory('db', ['$resource', '$http',
    function ($resource) {
        var actions = {
                'get': {method: 'GET'},
                'save': {method: 'POST'},
                'query': {method: 'GET', isArray: true},
                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'}
            },
            db = {};
        db.products = $resource('/casedesigns/:id', {}, actions);
        return db;
    }
]);