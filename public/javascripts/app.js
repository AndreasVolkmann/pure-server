angular.module('app', ['ngRoute', 'appConfig', 'ngMaterial', 'ngStorage', 'ngAnimate']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/Users.html',
            controller : 'User as ctrl'
        })
        .when('/login', {
            templateUrl: 'views/Login.html',
            controller : 'Login as ctrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

function go(destination, argument) {
    var path = '#/' + destination;
    if (argument) path += '/' + argument;
    console.log('Go to: ' + path);
    window.location.href = path;
}