const Router = require('koa-router');
const fs = require('fs');
const { checkLoggedIn } = require('./auth');

const logRouter = Router({
  prefix: '/logs'
});  //Prefixed all routes with /auth

const logs = JSON.parse(fs.readFileSync('data/logs.json', 'utf8')).logs;

//Logs has only one route: get logs
logRouter.get('/', checkLoggedIn, (ctx, next)=>{
  try{
    let limit = ctx.request.query.limit*1;
    let page = ctx.request.query.page*1;

    if(limit && page){
      ctx.body = {logs: logs.slice((page-1) * limit, page*limit)};
    } else {
      ctx.body = {logs}
    }
  } catch(err){
    ctx.response.status = 500;
    ctx.body = {message: "Internal server error", err}
  }

  next();
});

module.exports = {logRouter}