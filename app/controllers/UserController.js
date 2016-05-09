'use strict';

import User from '../models/User'

export default {
    getUsers: async() => {
        return await User.find({});
    },

    /**
     * Sign up a new User
     */
    signup: async(userData) => {
        try {
            let user = new User({
                userName: userData.userName,
                password: userData.password,
                role    : userData.role || 'user'
            });

            await user.save();
        } catch (err) {
            return err;
        }
    },

    /**
     * Verify the password, throw error if password or username is wrong
     */
    authenticate: async(userData)=> {
        let user = await User.findOne({
            userName: userData.userName
        });

        if (user) { // user exists
            if (user.comparePassword(userData.password)) { // true if passwords match
                return;
            } else {
                throw new Error('Wrong password');
            }
        }
        throw new Error('User could not be found');
    },

    /**
     * Check if the user exists and return the assigned roles
     */
    verifyUser: async(userName) => {
        let user = await Promise.resolve(User.findOne({userName: userName}));
        return user ? user.role : null;
    }
};
