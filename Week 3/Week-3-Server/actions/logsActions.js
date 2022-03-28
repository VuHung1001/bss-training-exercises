const fs = require('fs')

const logs = JSON.parse(fs.readFileSync('data/logs.json', 'utf8')).logs;

//Logs has routes: get logs '/:page' , '/' 
const logsGetByPagePath = (ctx, next)=>{
  try{
    let limit = ctx.request.query.limit*1;
    let page = ctx.request.params.page*1;

    if(limit || page){
      if(!limit) limit = 5;
      if(!page) page = 1;

      ctx.body = {logs: logs.slice((page-1) * limit, page*limit)};
    } else {
      ctx.body = {logs}
    }
  } catch(err){
    ctx.response.status = 500;
    ctx.body = {message: "Internal server error", err}
  }

  next();
}

const getLogs = (ctx, next)=>{
  try{
    let limit = ctx.request.query.limit*1;
    let page = ctx.request.query.page*1;

    if(limit || page){
      if(!limit) limit = 5;
      if(!page) page = 1;

      ctx.body = {logs: logs.slice((page-1) * limit, page*limit)};
    } else {
      ctx.body = {logs}
    }
  } catch(err){
    ctx.response.status = 500;
    ctx.body = {message: "Internal server error", err}
  }

  next();
}

module.exports = {logsGetByPagePath, getLogs}