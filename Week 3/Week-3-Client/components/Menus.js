const Menus = () => {
  return (
    <div class="menus">
      <div class="topbar">
        <a onclick="logout()" title="Logout">
          <i class="fas fa-sign-out"></i>
          <p>Logout</p>
        </a>
        <a onclick="redirectTo('login')">
          <i class="fas fa-user-circle"></i>
          <p>Welcome John</p>
        </a>
      </div>

      <div class="sidebar">
        <div class="for-mobile">
          <a onclick="redirectTo('login')">
            <i class="fas fa-user-circle"></i>
            <p>Welcome John</p>
          </a>

          <a onclick="logout()" title="Logout">
            <i class="fas fa-sign-out"></i>
            <p>Logout</p>
          </a>
        </div>

        <div class="main-item">
          <a onclick="redirectTo('dashboard')">
            <i class="fas fa-phone-laptop"></i>
            <p>Device Manager</p>
          </a>
        </div>

        <div class="item">
          <a onclick="redirectTo('dashboard')">
            <i class="far fa-phone-laptop"></i>
            <p id="dashboard-p">Dashboard</p>
          </a>
        </div>

        <div class="item">
          <a onclick="redirectTo('logs')">
            <i class="far fa-history"></i>
            <p id="logs-p">Logs</p>
          </a>
        </div>

        <div class="item">
          <a>
            <i class="fas fa-cog"></i>
            <p>Settings</p>
          </a>
        </div>
      </div>

      <div class="content"></div>
    </div>
  );
};

export default Menus;
