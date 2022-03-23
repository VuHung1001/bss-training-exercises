import { useRouter } from "next/router";
import LoaderStyles from '../styles/Loader.module.css'
import {useState, useEffect} from 'react'
import LoginCom from '../components/LoginCom'
import LogsCom from '../components/LogsCom'
import DashboardCom from '../components/DashboardCom'
import Menus from '../components/Menus'
// import Notification from '../components/Notification'


export default function Index() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  if (router.isFallback) {
    return <div className={LoaderStyles.loader}></div>;
  }

  useEffect(() => {
    if (window) { 
      setIsLoggedIn(window.sessionStorage.getItem("isLoggedIn")); 
    }
  }, [isLoggedIn]);  

  return(
    <>
      {/* <Notification/> */}
      {isLoggedIn ? (
        <Menus>
          <DashboardCom/>
          {/* <LogsCom/> */}
        </Menus>
      ) : (
          <LoginCom/>
      )}
    </>
  )
}
