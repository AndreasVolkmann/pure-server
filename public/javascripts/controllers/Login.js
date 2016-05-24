angular.module('app').controller('Login', ['Socket', '$scope', '$rootScope', '$localStorage',
    function (Socket, $scope, $rootScope, $localStorage) {
        $scope.$storage = $localStorage;


        $scope.user = {
            userName: '',
            password: ''
        };

        $scope.login = login;


        function login() {
            console.log('Logging in ...');
            $scope.loading = true;
            Socket.login($scope.user, onAuth);
        }

        function onAuth(error, user) {
            $scope.loading = false;
            if (error) {
                console.error(error);
                $scope.error = error;
            } else {
                $scope.$storage.user = user;
                $rootScope.user = user;
                console.log('Logged in!');
                go('');
            }
        }

        $scope.$on('$destroy', function (event) {
            Socket.removeAllListeners();
        });

    }]);