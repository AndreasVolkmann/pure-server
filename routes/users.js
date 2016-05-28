"use strict";
import UserController from '../app/controllers/UserController';
import jwt from 'jsonwebtoken'
import jwtconfig from '../config/jwtconfig'

const router = require('koa-router')();

/**
 * Get all Users
 */
router.get('/', async(ctx, next) => {
    ctx.body = await UserController.getUsers();
});

/**
 * User Login
 * return a jwtoken on success, otherwise error
 */
router.post('/login', async(ctx, next) => {
    try {
        const userData = ctx.request.body;
        const user = await UserController.authenticate(userData);
        const token = jwt.sign(userData, jwtconfig.secret);
        ctx.body = {token: token, role: user.role};
    } catch (err) {
        ctx.body = {error: err};
    }
});

module.exports = router;
