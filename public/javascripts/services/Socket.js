angular.module('app').factory('Socket', ['$rootScope', '$http', 'ip', function ($rootScope, $http, IP) {
    var token = $rootScope.token;
    var socket;

    if (token) auth(token);
    else socket = io.connect();

    socket.on('connect', function () {
        console.log('Socket connected! ' + socket.id);

        socket.on('disconnect', function (message) {
            console.log('Disconnected: ' + message);
        });
    });

    return {
        on: function (eventName, callback) {
            function wrapper() {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            }

            socket.on(eventName, wrapper);
        },

        emit          : function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        },
        removeListener: function (eventName, callback) {
            socket.removeListener(eventName, callback);
        },
        login         : login,
        auth          : auth,
        logout        : logout
    };

    function auth(token) {
        console.log('Authenticating ...');
        var query = 'token=' + token;
        socket.io.opts.query = query;
        socket.disconnect();
        socket = socket.connect();
    }

    function login(user, done) {
        $http.post('http://' + IP + '/users/login', user).then(function (response) {
            if (response.data.error) {
                done(response.data.error);
            } else {
                token = response.data.token;
                user.token = token;
                auth(token);
                done(null, user);
            }
        });
    }

    function logout() {
        socket.disconnect();
        delete $rootScope.user;
        delete $rootScope.token; // obsolete ?
    }

}]);