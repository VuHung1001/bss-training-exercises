const redirectTo = (page = dashboard) => {
  $(function () {
    page === "dashboard" && $(".content").load("dashboard.html");

    page === "logs" && $(".content").load("logs.html");

    page === "login" && $(".container").load("login.html");
  });
};

// toggle sidebar for mobile device
let isDisplay = true;
const toggleSidebar = (clickBtn = true) => {
  if (window.innerWidth <= 415) {
    
    if (isDisplay && !clickBtn) {
      $(document).ready(function () {
        $(".sidebar").animate({ left: "-100%" });
      });

      isDisplay = false;
    }

    if(!isDisplay && clickBtn) {
      $(document).ready(function () {
        $(".sidebar").animate({ left: "0" }, 'slow');
      });

      isDisplay = true;
    }
  }
};
