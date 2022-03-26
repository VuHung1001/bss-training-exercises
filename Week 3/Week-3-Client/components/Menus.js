import {logout} from '../call_api/userAPI'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useState } from 'react';
// import Script from 'next/script'

const Menus = ({children}) => {
  const router = useRouter();
  const [isDisplay, setIsDisplay] = useState(false)

  const logoutHandle = async () =>{
    let username = sessionStorage.getItem('username')

    if(username){
      let res = await logout(username)

      if(res?.message === 'Logout success'){
        sessionStorage.setItem('isLoggedIn', res.isLoggedIn)
        sessionStorage.removeItem('username')

        sessionStorage.setItem('title', "Logout!")
        sessionStorage.setItem('message', "Redirect to login page!")
        sessionStorage.setItem('type', "info")
        sessionStorage.setItem('duration', 5000)

        window.location.replace('/login')
      }
    }
  }

  const redirectTo = (path) =>{

    if(window.location.href.includes('dashboard')
      && window.outerWidth <= 415
    ){
      const sidebar = document.querySelector('.sidebar')
      
      sidebar.style.transform = 'translateX(-100%)';
      sidebar.style.transition = 'all linear 0.5s';
      
      setIsDisplay(false)

      const timeout = setTimeout(() =>{
        router.push('/'+path)
        window.clearTimeout(timeout)
      }, 500)
    }
    else router.push('/'+path)
  }

  const toggleSidebar = (clickBtn = true) => {
    if (window.outerWidth <= 415) {

      const sidebar = document.querySelector('.sidebar')
      
      if (isDisplay && !clickBtn) {

        sidebar.style.transform = 'translateX(-100%)';
        sidebar.style.transition = 'all linear 0.5s';
  
        setIsDisplay(false)
        return;
      }
  
      if(!isDisplay && clickBtn) {
        
        sidebar.style.transform = 'translateX(0%)';
        sidebar.style.transition = 'all linear 0.5s';

        setIsDisplay(true)
        return;
      }
    }
  };

  useEffect(() => {
    // change color link in sidebar menu
    window.location.href.includes("dashboard" )
      && $('#dashboard-p').addClass("active")
      && $('#logs-p').removeClass('active');

    window.location.href.includes("logs" )
      && $('#logs-p').addClass('active')
      && $('#dashboard-p').removeClass("active");


    // if page width <=415 px then show hamburger button
    const sidebar = document.querySelector('.sidebar')
    const hamburgerBtn = document.querySelector("#hamburger-button")

    if (window.outerWidth <= 415) {

      sidebar.style.transform = 'translateX(-100%)';
      sidebar.style.transition = 'all linear 0.5s';

      hamburgerBtn.style.display = 'block'

      setIsDisplay(false)
    }

    // check when switching to a wider screen and then show the menu again
    window.setInterval(()=>{
      if(window.outerWidth > 415){
        sidebar.style.transform = 'translateX(0%)';
        sidebar.style.transition = 'all linear 0.5s';

        setIsDisplay(true)
      }
    }, 500)
  }, [])
  

  return (
    <div className="menus">
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        strategy='beforeInteractive'
      ></Script>      */}
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"
        strategy='beforeInteractive'
      ></Script>       */} 
      <div id="hamburger-button" 
        onClick={() =>{
          setIsDisplay(false)
          toggleSidebar(true)}
        }
      >
        <i className="fas fa-bars"></i>
      </div>    

      <div className="topbar">
        <a onClick={logoutHandle} title="Logout">
          <i className="fas fa-sign-out"></i>
          <p>Logout</p>
        </a>
        <a onClick={logoutHandle}>
          <i className="fas fa-user-circle"></i>
          <p>Welcome John</p>
        </a>
      </div>

      <div className="sidebar">
        <div className="for-mobile">
          <a onClick={logoutHandle}>
            <i className="fas fa-user-circle"></i>
            <p>Welcome John</p>
          </a>

          <a onClick={logoutHandle} title="Logout">
            <i className="fas fa-sign-out"></i>
            <p>Logout</p>
          </a>
        </div>

        <div className="main-item">
          <a onClick={() => redirectTo('dashboard')}>
            <i className="fas fa-phone-laptop"></i>
            <p>Device Manager</p>
          </a>
        </div>

        <div className="item">
          <a onClick={() => redirectTo('dashboard')}>
            <i className="far fa-phone-laptop"></i>
            <p id="dashboard-p">Dashboard</p>
          </a>
        </div>

        <div className="item">
          <a onClick={() => redirectTo('logs')}>
            <i className="far fa-history"></i>
            <p id="logs-p">Logs</p>
          </a>
        </div>

        <div className="item">
          <a>
            <i className="fas fa-cog"></i>
            <p>Settings</p>
          </a>
        </div>
      </div>

      <div className="content"  onClick={() =>{
        setIsDisplay(true)
        toggleSidebar(false)}
      }>{children}</div>
    </div>
  );
};

export default Menus;
