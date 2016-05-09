'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    userName: {
        type    : String,
        unique  : true,
        required: true
    },
    password: {
        type    : String,
        required: true
    },
    role    : {
        type   : String,
        default: 'user'
    }
});

UserSchema.pre('save', function (next) {
    let user = this;
    if (this.isNew || this.isModified('password')) {
        try {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(user.password, salt);
            user.password = hash;
        } catch (err) {
            next(err);
        }
    }
    next();
});


UserSchema.methods.comparePassword = function (passw) {
    return bcrypt.compareSync(passw, this.password);
};

export default mongoose.model('User', UserSchema);