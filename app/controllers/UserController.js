'use strict';

import User from '../models/User'

export default {
    getUsers: async() => {
        return await User.find({});
    }

};
