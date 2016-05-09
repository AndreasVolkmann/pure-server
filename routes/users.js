import UserController from '../app/controllers/UserController';
const router = require('koa-router')();


router.get('/', async(ctx, next) => {
    ctx.body = await UserController.getUsers();
});

module.exports = router;
