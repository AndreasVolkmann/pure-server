angular.module('app').controller('User', ['Socket', '$scope', function (Socket, $scope) {

    $scope.users = [];

    Socket.emit('users:get');

    Socket.on('users', function (users) {
        $scope.users = users;
    });

    Socket.on('test', function (test) {
        console.log(test);
    })
}]);