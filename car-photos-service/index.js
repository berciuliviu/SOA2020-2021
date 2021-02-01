let port = 3003

const fetch = require('node-fetch');

// KOA
const Koa = require('koa');
const app = new Koa();

// KOA BODY
const koaBody = require('koa-body');
app.use(koaBody());

// KOA ROUTER
const Router = require('@koa/router');
const router = new Router();

router.get('/car-img', async (ctx, next) => {
    ctx.body = await fetch('https://api.unsplash.com/photos/random?query=car&query=taxi', {
        method: 'GET',
        headers: {
            'Authorization': 'Client-ID O0e6K0wtqrZMsn4csYUHrxZF31qfhglzCE40hUdAtlc',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    console.log(ctx.body)
    await next()
});

app.use(router.routes()).use(router.allowedMethods())

app.listen(port);