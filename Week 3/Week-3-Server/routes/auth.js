const Router = require('koa-router');
const {login, logout, checkLogIn} = require('../actions/authActions')

const authRouter = Router({
  prefix: '/auth'
});  //Prefixed all routes with /auth

//Routes will go here

//login
authRouter.post('/login', (ctx, next)=>{
  login(ctx, next)
});

//logout
authRouter.get('/logout/:username', (ctx, next)=>{
  logout(ctx, next)
});

// check logged in
const checkLoggedIn = (ctx, next)=>{
  checkLogIn(ctx, next)
};

module.exports = {authRouter, checkLoggedIn};
