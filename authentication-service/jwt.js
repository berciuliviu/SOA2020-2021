
const koaJwt = require('koa-jwt');

module.exports = koaJwt({
    secret: 'key-berx', // Should not be hardcoded
});