'use strict';

import User from '../models/User'

module.exports = {

    getUsers: async() => {
        return await User.find({});
    }
};
