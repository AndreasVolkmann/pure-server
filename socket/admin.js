"use strict";
module.exports = function (io, socket) {

    // put some logic here for admins only

    socket.on('users:online', () => {
        const CLIENTS = [];
        const NS = io.of('/');
        if (NS) {
            for (var id in NS.connected) {
                CLIENTS.push(NS.connected[id].userName);
            }
        }


        console.log(CLIENTS);
        socket.emit('users:online', CLIENTS);
    });

};