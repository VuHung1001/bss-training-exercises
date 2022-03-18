// check username and password for login
const login = ()=>{
  window.event.preventDefault();
  const username = $('#username').val()
  const password = $('#password').val()

  if(username === 'john' && password === '1234'){
    $(".container").load("menus.html"); // login success, redirect to main page

    localStorage.setItem("isLogin", JSON.stringify(true));// save is-logged-in state into local storage

    // send login success message
    notification(
      "Login success!",
      "Welcome!",
      "success",
      5000,
    );
  } 
  // if login fail, show warning message
  else {
    notification(
      "Login failed!",
      "Your username and password are not correct yet!",
      "warning",
      10000,
    );    
  }
};

// logout, set is-logged-in state = false, redirect to login page
const logout = ()=>{
  localStorage.setItem("isLogin", false);
  $(".container").load("login.html");
}