import LoginCom from "../components/LoginCom";
import { useContext } from 'react';
import { MainContext } from '../pages/_app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Login = () => {

  const router = useRouter();
  const { isLoggedIn } = useContext(MainContext); 

  useEffect(()=>{
    if(isLoggedIn === 'true') {
      router.push('/dashboard')
    }
  }, [isLoggedIn, router])  

  return (
      <LoginCom/>
  );
};

export default Login;
