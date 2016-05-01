'use strict';

import UserController from '../app/controllers/UserController';

module.exports = function (io, socket) {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('users:get', async() => {
        let users = await UserController.getUsers();
        socket.emit('users', users);
    });


};

