// create notification (error, success, warning, information)
function notification(title, message, type, duration) {
  const main = document.getElementById("notification");
  if (main) {
    const notification = document.createElement("div");

    // Auto remove notification
    const autoRemoveId = window.setTimeout(function () {
      main.removeChild(notification);
    }, duration + 1000);

    // Remove notification when clicked
    notification.onclick = function (e) {
      if (e.target.closest(".notification_close")) {
        main.removeChild(notification);
        window.clearTimeout(autoRemoveId);
      }
    };

    // icons classes
    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    // create animation for notification
    notification.classList.add("notification", `notification-${type}`);
    notification.style.animation = `slideInLeft ease .5s, fadeOut linear 1s ${delay}s forwards`;

    // append html tag
    notification.innerHTML = `
                  <div class="notification_icon">
                      <i class="${icon}"></i>
                  </div>
                  <div class="notification_body">
                      <h3 class="notification_title">${title}</h3>
                      <p class="notification_msg">${message}</p>
                  </div>
                  <div class="notification_close">
                      <i class="fas fa-times"></i>
                  </div>
              `;
    main.appendChild(notification);
    return;
  }
}
