angular.module('app').factory('UserFactory', ['$http', 'ip', function ($http, IP) {

    var url = 'http://' + IP;

    return {
        getUsers: function (callback) {
            $http.get(url + '/users/').then(function (response) {
                callback(response.data);
            });
        }
    }
}]);