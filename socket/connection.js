import jwtconfig from '../config/jwtconfig'
import UserController from '../app/controllers/UserController'
import jwt from 'jsonwebtoken'

module.exports = function (io) {

    io.on('connection', function (socket) {
        console.log(`Socket connected: ${socket.id}`);
        require('./user')(io, socket);
    });

    /**
     * Middleware that runs before connect
     * put Authentication here
     */
    io.use(async function (socket, next) {
        try {
            let token = socket.handshake.query.token;
            if (token) {
                let decoded = jwt.verify(token, jwtconfig.secret);

                let role = await UserController.verifyUser(decoded.userName);

                if (role) {
                    // if the user is an Admin, give him access to the restricted endpoints
                    if (role === 'admin') {
                        require('./admin')(io, socket);
                    }
                    return next();
                }
            }
            throw new Error('Auth Error');
        } catch (err) {
            socket.disconnect();
            next(err);
        }
    });
};
