const Router = require('koa-router');
const fs = require('fs');
const { checkLoggedIn } = require('./auth');

const deviceRouter = Router({
  prefix: '/devices'
});  //Prefixed all routes with /auth

const devices = JSON.parse(fs.readFileSync('data/devices.json', 'utf8')).devices;

//Routes will go here

// add device
deviceRouter.post('/', checkLoggedIn, (ctx, next)=>{
  try{
    devices.push(ctx.request.body)

    let devicesJSON = `{"devices": ${JSON.stringify(devices)} }`

    fs.writeFileSync('data/devices.json', devicesJSON, 'utf8')

    ctx.body = {devices};
  } catch(err){
    ctx.response.status = 500;
    ctx.body = {message: "Add device error", err}
  }

  next();
});

// get devices
deviceRouter.get('/', checkLoggedIn, (ctx, next)=>{
  try{
    ctx.body = {devices};
  } catch(err){
    ctx.response.status = 500;
    ctx.body = {message: "Internal server error", err}
  }

  next();
});

// update device
deviceRouter.put('/', checkLoggedIn, (ctx, next)=>{
  try{
    let {index, ...rest} = ctx.request.body

    devices[index*1] = {...rest}

    let devicesJSON = `{"devices": ${JSON.stringify(devices)} }`

    fs.writeFileSync('data/devices.json', devicesJSON, 'utf8')

    ctx.body = {devices};
  } catch(err){
    ctx.response.status = 500;
    ctx.body = {message: "Add device error", err}
  }

  next();
});

// delete device
deviceRouter.delete('/:index', checkLoggedIn, (ctx, next)=>{
  try{
    devices.splice(ctx.params.index*1, 1)

    let devicesJSON = `{"devices": ${JSON.stringify(devices)} }`

    fs.writeFileSync('data/devices.json', devicesJSON, 'utf8')

    ctx.body = {devices};
  } catch(err){
    ctx.response.status = 500;
    ctx.body = {message: "Internal server error", err}
  }

  next();
});

module.exports = {deviceRouter};