// AUTH PORT 3004
const port = 3004;
const Koa = require('koa');
const app = new Koa();
const Router = require('@koa/router');
const router = new Router();
const koaBody = require('koa-body');
userService = require("./users");
app.use(koaBody());

app.use(router.routes()).use(router.allowedMethods());

// GET ALL USERS
router.get('/users', ctx => {
    ctx.status = 200;
    ctx.body = userService.getUsers();
});

// GET A SPECIFIC USER
router.get('/user/:id', ctx => {
    if (userService.getUser(ctx.params.id)) {
        ctx.body = userService.getUser(ctx.params.id);
    }
    else {
        ctx.status = 404;
        ctx.body = { "error": "There is no user with that id" };
    }
});

// INSERT A USER IN THE DB
router.post('/user', ctx => {
    ctx.body = userService.postUser(this.request.body);
});

app.listen(port);