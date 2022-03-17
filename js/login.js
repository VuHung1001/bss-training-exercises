const login = ()=>{
  window.event.preventDefault();
  const username = $('#username').val()
  const password = $('#password').val()

  if(username === 'john' && password === '1234'){
    $(".container").load("menus.html");

    localStorage.setItem("isLogin", JSON.stringify(true));

    notification(
      "Login success!",
      "Welcome!",
      "success",
      5000,
    );
  } else {
    notification(
      "Login failed!",
      "Your username and password are not correct yet!",
      "warning",
      10000,
    );    
  }
};

const logout = ()=>{
  localStorage.setItem("isLogin", false);
  $(".container").load("login.html");
}