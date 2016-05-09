

module.exports = function (io) {

    io.on('connection', function (socket) {
        console.log(`Socket connected: ${socket.id}`);
        require('./user')(io, socket);
    });

    io.use(async function (socket, next) {
        // put auth here
        next();
    });
};
