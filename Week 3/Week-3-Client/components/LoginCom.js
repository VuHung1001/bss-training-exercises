import {login} from '../call_api/userAPI'
import { useEffect, useState } from 'react';
// import Script from 'next/script'
// import useScript from '../hooks/useScript';

const LoginCom = () => {
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js')
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // check username and password for login
  const loginHandle = (e)=>{
    e.preventDefault();
    const username = $('#username').val()
    const password = $('#password').val()

    if(username != '' && password != ''){
      setUsername(username);
      setPassword(password);
    } 
    // if empty, show warning message
    else {   

      sessionStorage.setItem('title', "Login failed!")
      sessionStorage.setItem('message', "Your username and/or password are not inputted!")
      sessionStorage.setItem('type', "warning")
      sessionStorage.setItem('duration', 10000)

      location.reload()
    }
  };

  useEffect(()=>{
    const checkLogin = async ()=>{
      if(username != '' && password != ''){
        const res = await login(username, password)

        if(res?.message === 'Login success'){
          sessionStorage.setItem('isLoggedIn', res.isAuthed)
          sessionStorage.setItem('username', res.username)

          sessionStorage.setItem('title', "Hello mate")
          sessionStorage.setItem('message', "Welcome!")
          sessionStorage.setItem('type', "success")
          sessionStorage.setItem('duration', 5000)

          location.reload()
        } else {
          sessionStorage.setItem('title', "Login failed!")
          sessionStorage.setItem('message', "Your username and password are not correct yet!")
          sessionStorage.setItem('type', "error")
          sessionStorage.setItem('duration', 10000)

          location.reload()
        }
      }
    }

    checkLogin()
  }, [username, password])

  return (
    <div className="login-container">
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        strategy='beforeInteractive'
      ></Script>      */}
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"
        strategy='beforeInteractive'
      ></Script>       */} 
      <form action="">
        <h2>
          <b>SOIOT SYSTEM</b>
        </h2>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <div className="btn-container">
          <button onClick={(e)=>loginHandle(e)} type="submit">
            LOGIN
          </button>
          <a>or create new account</a>
        </div>
      </form>
    </div>
  );
};

export default LoginCom;
