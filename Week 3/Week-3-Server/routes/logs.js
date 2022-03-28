const Router = require('koa-router');
const { checkLoggedIn } = require('./auth');
const {logsGetByPagePath, getLogs} = require('../actions/logsActions')

const logRouter = Router({
  prefix: '/logs'
});  //Prefixed all routes with /auth

//Logs has routes: get logs '/:page' , '/' 
logRouter.get('/:page', checkLoggedIn, (ctx, next)=>{
  logsGetByPagePath(ctx, next)
});

logRouter.get('/', checkLoggedIn, (ctx, next)=>{
  getLogs(ctx, next)
})

module.exports = {logRouter}