import Koa from 'koa'
import convert from 'koa-convert'
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'kcors';

const router = require('koa-router')();
const app = new Koa();
app.io = require('socket.io')();

const index = require('./routes/index');
const users = require('./routes/users');

// middleware
app.use(convert(bodyparser()));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(require('koa-static')(__dirname + '/public')));
app.use(cors());

// logger
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

app.use(router.routes(), router.allowedMethods());

// response
app.on('error', function (err, ctx) {
    console.log(err);
    logger.error('server error', err, ctx);
});


export default app;