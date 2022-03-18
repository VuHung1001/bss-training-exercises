// directing when user click a tag
const redirectTo = (page = 'dashboard') => {
  
  page === "dashboard" 
    && $(".content").load("dashboard.html")
    && $('#dashboard-p').addClass("active")
    && $('#logs-p').removeClass('active');

  page === "logs" 
    && $(".content").load("logs.html")
    && $('#logs-p').addClass('active')
    && $('#dashboard-p').removeClass("active");

  page === "login" 
    && $(".container").load("login.html")
    && $('#hamburger-button').hide();
};

// toggle sidebar for mobile device screen
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
        $(".sidebar").animate({ left: "0" });
      });

      isDisplay = true;
    }
  }
};
