const jsonwebtoken = require('jsonwebtoken');
const fetch = require('node-fetch');

module.exports = async function (ctx) {
    let users = await fetch("http://users-service:3004/users").then(res => res.json())
    let valid = false;
    let body = ctx.request.body
    console.log(body)
    for (let user of users) {
        console.log("Body " + body["username"] + " " + body["password"])

        console.log("DB " + user["username"] + " " + user["password"])
        if (user["username"] === body["username"] && user["password"] === body["password"]) {
            valid = true;
            break
        }
    }

    if (valid) {
        console.log("Valid login")
        ctx.status = 200;
        ctx.body = {
            token: jsonwebtoken.sign(body["username"], 'key-berx'), //Should be the same secret key as the one used is ./jwt.js
            message: "Successfully logged in!"
        };
    } else {
        console.log("Invalid login.")
        ctx.status = ctx.status = 401;
        ctx.body = {
            token: "invalid",
            message: "Authentication failed"
        };
    }
    return ctx;
}