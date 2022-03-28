const Router = require('koa-router');
const { checkLoggedIn } = require('./auth');
const {addDevice, getAllDevices, updateDevice, deleteDevice} = require('../actions/devicesActions')

const deviceRouter = Router({
  prefix: '/devices'
});  //Prefixed all routes with /auth

//Routes will go here

// add device
deviceRouter.post('/', checkLoggedIn, (ctx, next)=>{
  addDevice(ctx, next)
});

// get devices
deviceRouter.get('/', checkLoggedIn, (ctx, next)=>{
  getAllDevices(ctx, next)
});

// update device
deviceRouter.put('/', checkLoggedIn, (ctx, next)=>{
  updateDevice(ctx, next)
});

// delete device
deviceRouter.delete('/:index', checkLoggedIn, (ctx, next)=>{
  deleteDevice(ctx, next)
});

module.exports = {deviceRouter};