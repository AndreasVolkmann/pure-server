angular.module('app', ['ngRoute', 'appConfig', 'ngMaterial', 'ngStorage']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/Users.html',
            controller: 'User as ctrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);