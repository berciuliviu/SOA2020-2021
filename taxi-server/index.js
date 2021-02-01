// AUTH PORT 3001
const port = 3001;
const Koa = require('koa');
const app = new Koa();
const Router = require('@koa/router');
const router = new Router();
const koaBody = require('koa-body');
carService = require("./cars");
app.use(koaBody());

app.use(router.routes()).use(router.allowedMethods());


router.get('/cars', ctx => {
    ctx.status = 200;
    console.log("Send cars!")
    ctx.body = carService.getCars();
});

router.post('/car', ctx => {
    ctx.status = 200;
    let car = ctx.request.body;
    console.log("Got car " + car)
    returned_car = carService.postCar(car)
    console.log("returned car " + JSON.stringify(returned_car))
    ctx.body = JSON.stringify(returned_car)
})

app.listen(port);