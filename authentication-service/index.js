// AUTH PORT 3002
const port = 3002;
const fetch = require('node-fetch');

// WEB SOCKET
const WebSocket = require('ws')

const websocket = new WebSocket.Server({ port: 8080 })

websocket.on('connection', ws => {
	console.log('MAIN: A new client has connected!');
})

// KOA
const Koa = require('koa');
const app = new Koa();

// AUTH
const authenticate = require('./authenticate.js');

// ROUTER
const Router = require('@koa/router');
const router = new Router();

// CORS
const cors = require('@koa/cors');
app.use(cors());

// KOA BODY
const koaBody = require('koa-body');
app.use(koaBody());

router.post('/public/login', async (ctx, next) => {
	await authenticate(ctx);
	await next()
});

var jwt = require('./jwt');
app.use(jwt.unless({
	path: [/^\/public/, "/"]
}));

// 3001 CARS GET
router.get('/cars', async (ctx, next) => {
	console.log("MAIN: Send Cars")
	ctx.body = await fetch('http://taxi-service:3001/cars', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(data => data.json())
	await next()
})

// 3001 CAR POST
router.post('/car', jwt, async (ctx, next) => {
	console.log("MAIN: PUT Car")
	console.log(ctx.request.body)
	ctx.body = await fetch('http://taxi-service:3001/car', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(ctx.request.body)
	}).then(data => data.json())
	websocket.clients.forEach(client => client.send(JSON.stringify(ctx.body)));
	await next()
})

// 3003 GET 3RD PARTY CAR
router.get('/car-img', async (ctx, next) => {
	let res = await fetch('http://car-photos-service:3003/car-img', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(res => res.json())
	console.log(res)
	if (res.hasOwnProperty('errors')) {
		ctx.body = "https://images.unsplash.com/photo-1610478506563-45ad2293fd5f?ixid=MXwyMDI5MDd8MHwxfHJhbmRvbXx8fHx8fHx8&ixlib=rb-1.2.1"
	} else {
		ctx.body = res['urls']['raw']
	}

	await next()
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port);