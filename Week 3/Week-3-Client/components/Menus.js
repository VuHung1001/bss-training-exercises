import {logout} from '../call_api/userAPI'
import { useRouter } from 'next/router'

const Menus = ({children}) => {
  const router = useRouter();

  const logoutHandle = async () =>{
    let username = sessionStorage.getItem('username')

    if(username){
      let res = await logout(username)
      console.log(res);

      if(res.message === 'Logout success'){
        sessionStorage.setItem('isLoggedIn', res.isLoggedIn)
        sessionStorage.removeItem('username')

        router.push('/login')
      }
    }
  }

  return (
    <div className="menus">
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
          <a onClick="redirectTo('dashboard')">
            <i className="fas fa-phone-laptop"></i>
            <p>Device Manager</p>
          </a>
        </div>

        <div className="item">
          <a onClick="redirectTo('dashboard')">
            <i className="far fa-phone-laptop"></i>
            <p id="dashboard-p">Dashboard</p>
          </a>
        </div>

        <div className="item">
          <a onClick="redirectTo('logs')">
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

      <div className="content">{children}</div>
    </div>
  );
};

export default Menus;
