angular.module('app').controller('Main', ['$rootScope', 'Socket', '$scope', '$localStorage', '$route',
    function ($rootScope, Socket, $scope, $localStorage, $route) {
        $scope.$storage = $localStorage;

        var user = $scope.$storage.user;
        if (user) {
            Socket.auth(user.token, function (err) {
                if (err) console.log(err);
                else {
                    $rootScope.user = user;
                }
            });
            console.log(user);
        }

        var self = this;
        self.title = 'Pure Seed';

        self.logout = logout;


        function logout() {
            delete $scope.$storage.user;
            Socket.logout();
            $route.reload();
        }
    }]);