const koa = require('koa');
const router = require('koa-router');
const bodyParser = require('koa-body');
const cors = require('@koa/cors');

//Require the Routers we defined in routes/
const {authRouter} = require('./routes/auth.js'); // login and logout
const {deviceRouter} = require('./routes/devices.js'); // devices
const {logRouter} = require('./routes/logs.js'); // logs

// require dotenv to use .env file
require('dotenv').config()
//port
const port = process.env.PORT || 3001 ;

const app = new koa();

//koa cors
// origin: request Origin header
// allowMethods: GET,HEAD,PUT,POST,DELETE,PATCH
app.use(cors())

//Set up body parsing middleware
app.use(bodyParser({
   multipart: true,
   urlencoded: true
}));

//Use the Router on the sub routes/
app.use(authRouter.routes());
app.use(deviceRouter.routes());
app.use(logRouter.routes());

app.listen(port, ()=> console.log('Server running on port '+port));