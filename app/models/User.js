'use strict';

import mongoose from 'mongoose';
const EXPIRES = 60 * 30;


const UserSchema = new mongoose.Schema({
    userName: String,
    created: {
        type: Date,
        expires: EXPIRES,
        default: Date.now()
    },
    role: {
        type: String,
        default: 'user'
    },
    loc: {
        type: [Number],
        index: '2d',
        sparse: true
    }
});


export default mongoose.model('User', UserSchema);