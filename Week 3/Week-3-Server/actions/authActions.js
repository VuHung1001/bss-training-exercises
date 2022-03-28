const fs = require('fs')

const users = JSON.parse(fs.readFileSync('data/users.json', 'utf8')).users;

const login = (ctx, next)=>{
  let isAuthed = false;
  for(let user of users){
    if(user.username === ctx.request.body.username
      && user.password === ctx.request.body.password){
        isAuthed = true;
    }
  }

  if(isAuthed){
    ctx.body = {message: "Login success", username: ctx.request.body.username, isAuthed};
  } else{
    ctx.response.status = 401;
    ctx.body = {message: "Unauthorized"}
  }

  next();
}

const logout = (ctx, next)=>{
  let isAuthed = false;
  for(let user of users){
    if(user.username === ctx.params.username){
        isAuthed = true;
    }
  }

  if(isAuthed){
    ctx.body = {message: "Logout success", isLoggedIn: false};
  } else{
    ctx.response.status = 401;
    ctx.body = {message: "Unauthorized"}
  }

  next();
}

const checkLogIn= (ctx, next)=>{
  let isLoggedIn = ctx.request.header.isloggedin === 'true';

  if(isLoggedIn){
    next();
    // ctx.body = {message: "Logged in"}
  } else{
    ctx.response.status = 401;
    ctx.body = {message: "Unauthorized"}
  }
};

module.exports = {login, logout, checkLogIn}