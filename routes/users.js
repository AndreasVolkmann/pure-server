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
        let user = ctx.request.body;
        await UserController.authenticate(user);
        let token = jwt.sign(user, jwtconfig.secret);
        ctx.body = {token: token};
    } catch (err) {
        ctx.body = {error: err};
    }
});

module.exports = router;
