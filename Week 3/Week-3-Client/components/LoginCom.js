import LoginStyles from '../styles/Login.module.css'
import {login} from '../call_api/userAPI'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

const LoginCom = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();

  // check username and password for login
  const loginHandle = (e)=>{
    e.preventDefault();
    const username = $('#username').val()
    const password = $('#password').val()
console.log(username, password);

    if(username != '' && password != ''){
      setUsername(username);
      setPassword(password);
    } 
    // if empty, show warning message
    else {
      // notification(
      //   "Login failed!",
      //   "Your username and password are not correct yet!",
      //   "warning",
      //   10000,
      // );    
    }
  };

  useEffect(async ()=>{
    if(username != '' && password != ''){
      const res = await login(username, password)
      if(res.message === 'Login success'){
        sessionStorage.setItem('isLoggedIn', res.isAuthed)
        sessionStorage.setItem('username', res.username)

        console.log(sessionStorage.getItem('isLoggedIn'), sessionStorage.getItem('username'));
        router.push('/dashboard')
      }
    }
  }, [username, password])

  return (
    <div className="login-container">
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
