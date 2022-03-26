import LoginCom from "../components/LoginCom";
import { useContext } from 'react';
import { MainContext } from '../pages/_app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
// import useScript from '../hooks/useScript';

const Login = () => {
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js')
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js')

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
