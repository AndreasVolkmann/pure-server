angular.module('app').controller('User', ['Socket', '$scope', '$rootScope', function (Socket, $scope, $rootScope) {

    $scope.users = [];
    $scope.online = [];

    Socket.emit('users:get');

    Socket.on('users', function (users) {
        $scope.users = users;
    });


    //if ($rootScope.user && $rootScope.user.role === 'admin') {
        Socket.emit('users:online');

        Socket.on('users:online', function (online) {
            console.log(online);
            $scope.online = online;
        });

        Socket.on('user:online', function (online) {
            $scope.online.push(online);
        });

        Socket.on('user:offline', function (offline) {
            var index = $scope.online.findIndex(offline);
            $scope.online.splice(index, 1);
        });
    //}
    
    
    
}]);