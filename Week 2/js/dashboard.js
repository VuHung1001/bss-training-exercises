// load table in dashboard page
const loadTableDashboard = ()=> {
  const tBody = $("#dashboard-table-body");
  const totalHTML = $("#dashboard-table-total");
  let total = 0;

  // stored is declared in file data.js
  if (stored.length > 0) {
    tBody.empty();

    // append row into table
    stored.map((value, index) => {
      tBody.append(`
        <tr>
          <td>
            <input class='dashboard-table-input input-${index}' id='edit-device-${index}' type='text' placeholder='${value.device}'/>
          </td>
          <td>${value.macAddress}</td>
          <td>
            <input 
              class='dashboard-table-input 
              input-${index}' id='edit-ip-${index}' 
              type='text' 
              placeholder='${value.ip}'
              style="text-align: right;"
            />
          </td>
          <td>${value.createdDate}</td>
          <td>${value.power}</td>
          <td>
            <button class='dashboard-delete_row-btn button-delete-${index}' >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>            
      `);

      // add onclick event handler to delete button
      $(`.button-delete-${index}`).click(()=>removeDevice(value.device))

      // convert delete button to edit button when focus input
      $(`.input-${index}`).focus(()=>{
        $(`.button-delete-${index}`).attr('class', `dashboard-edit_row-btn button-edit-${index}`)
        $(`.button-edit-${index} i`).attr('class', 'fas fa-edit')
      })

      // convert edit button to delete button when blur input
      $(`.input-${index}`).blur(()=>{
        $(`.button-edit-${index}`).attr('class', `dashboard-delete_row-btn button-delete-${index}`)
        $(`.button-delete-${index} i`).attr('class', 'fas fa-trash-alt')
      })

      total += value.power;
    });

    // set total cell equal sum of powers
    totalHTML.text(total);
  }
}


// add device and reload table and chart
const addDevice = ()=>{
  window.event.preventDefault();
  const name = $('#name').val();
  const ip = $('#ip').val();
  const ipRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/g; // regexp to test ip address
  let isError = false;

  ipRegex.test(ip) // must run this line for the condition in IF to run properly
  // if name is empty
  if(name.trim() === ''){
    notification(
      "Add failed!",
      "Device name is not inputted yet!",
      "error",
      10000,
    );
    isError = true;
    $('#name').focus();
    return;
  }

  ipRegex.test(ip) // must run this line for the condition in IF to run properly
  // if ip is not correct format
  if(ipRegex.test(ip) === false){
    notification(
      "Add failed!",
      "Device IP is not correct! Example IP addresses:<br/>"
      +"127.0.0.1<br/>"
      +"192.168.1.1<br/>"
      +"192.168.1.255<br/>"
      +"255.255.255.255<br/>"
      +"0.0.0.0",
      "error",
      10000,
    );
    isError = true;
    $('#ip').focus();
    return;
  }

  if(isError) {
    $('#name').focus();
    return;
  }; // error is existed, return this function

  ipRegex.test(ip) // must run this line for the condition in IF to run properly
  if(name.trim() !== '' && ipRegex.test(ip)){

    // ipData and deviceData is declared in file doughnut-chart.js

    // name and ip must be unique
    if(deviceData.includes(name)){
      notification(
        "Add failed!",
        "Device name is existed!",
        "error",
        10000,
      );
      isError = true;
      $('#name').focus();
      return;
    }
    
    if(ipData.includes(ip)){
      notification(
        "Add failed!",
        "Device ip is existed!",
        "error",
        10000,
      );
      isError = true;
      $('#ip').focus();
      return;
    }

    if(isError) {
      $('#name').focus();
      return;
    }; // error is existed, return this function

    // generate mac address
    let macAddress = "00:1B:XX:XX:XX:XX".replace(/X/g, function() {
      return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
    });

    // created date is today
    let yourDate = new Date()
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset*60*1000))

    // push device object to stored array
    stored.push({
      device: name,
      macAddress: macAddress,
      ip,
      createdDate: yourDate.toISOString().split('T')[0],
      power: Math.floor((Math.floor(Math.random() * 100) + 10) / 10) * 10, // power is random number can divisible by 10
    })

    // add device to local storage
    localStorage.setItem("devices", JSON.stringify(stored));
    data = JSON.parse(localStorage.getItem("devices"));

    // reload table and chart
    loadTableDashboard()
    loadChart()

    $('#name').val('');
    $('#ip').val('');
  }
}


// edit specific device by device name and ip address
const editDevice = (index)=>{
  
}


// remove specific device by device name
const removeDevice = (deviceName)=>{
  // ask user to confirm before deleting
  const isRemove = confirm('Are you really want remove this device? Can not return!')

  // remove device from stored array
  isRemove 
    && stored.splice(
      stored.indexOf(
        stored.filter((value, index)=>{
          return value.device === deviceName;
        })[0]
      )
      , 1
    )

  // update local storage
  localStorage.setItem("devices", JSON.stringify(stored));
  data = JSON.parse(localStorage.getItem("devices"));

  // reload table and chart
  loadTableDashboard()
  loadChart()
}


