angular.module('app').factory('Socket', ['$rootScope', '$http', 'ip', function ($rootScope, $http, IP) {
    var token = $rootScope.token;
    var socket;

    socket = io.connect();

    socket.on('connect', function () {
        console.log('Socket connected! ' + socket.id);
    });
    socket.on('disconnect', function (message) {
        console.log('disconnected ' + message);
    });
    socket.on('error', function (err) {
        console.log(err);
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

        emit              : function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        },
        removeListener    : function (eventName, callback) {
            socket.removeListener(eventName, callback);
        },
        removeAllListeners: function () {
            socket.removeAllListeners();
        },
        login             : login,
        auth              : auth,
        logout            : logout
    };

    function auth(token, done) {
        console.log('Authenticating ...');
        var query = 'token=' + token;
        socket.io.opts.query = query;
        socket.disconnect();
        socket = socket.connect();

        socket.on('error', error);

        socket.on('auth', auth);

        function error(err) {
            done(err);
            removeEvents();
        }

        function auth() {
            done();
            removeEvents();
        }

        function removeEvents() {
            socket.removeListener('error', error);
            socket.removeListener('auth', auth);
        }
    }

    function login(user, done) {
        $http.post('http://' + IP + '/users/login', user).then(function (response) {
            if (response.data.error) {
                done(response.data.error);
            } else {
                token = response.data.token;
                user = {
                    userName: user.userName,
                    token   : token,
                    role    : response.data.role
                };
                auth(token, function (err) {
                    if (err) return done(err);
                    done(null, user);
                });
            }
        });
    }

    function logout() {
        socket.disconnect();
        delete $rootScope.user;
        delete $rootScope.token; // obsolete ?
    }

}]);