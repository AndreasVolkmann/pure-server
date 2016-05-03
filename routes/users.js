const router = require('koa-router')();
const UserController = require('../app/controllers/UserController');


router.get('/', async (ctx, next) => {
    ctx.body = await UserController.getUsers();
});

module.exports = router;
