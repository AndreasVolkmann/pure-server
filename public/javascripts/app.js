angular.module('app', ['ngRoute', 'appConfig']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/Users.html',
            controller: 'User as ctrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);