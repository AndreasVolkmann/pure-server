import jwtconfig from '../config/jwtconfig'
import UserController from '../app/controllers/UserController'
import jwt from 'jsonwebtoken'

export default {
    /**
     * 
     * @param io
     */
    register: function (io) {

        io.on('connection', function (socket) {
            console.log(`Socket connected: ${socket.id}`);
            socket.emit('auth');
            require('./user')(io, socket);
            if (socket.role === 'admin') { // if the user is an Admin, give him access to the restricted endpoints
                require('./admin')(io, socket);
            }
        });

        /**
         * Middleware that runs before connect
         * put Authentication here
         */
        io.use(async function (socket, next) {
            try {
                let token = socket.handshake.query.token;
                if (token) {
                    const decoded = jwt.verify(token, jwtconfig.secret);

                    const role = await UserController.verifyUser(decoded.userName);

                    if (role) {
                        socket.userName = decoded.userName;
                        socket.role = role;
                        return next();
                    }
                }
                throw new Error('Auth Error');
            } catch (err) {
                socket.disconnect();
                next(err);
            }
        });
    }
};
