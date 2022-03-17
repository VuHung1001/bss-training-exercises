const loadTableDashboard = ()=> {
  const tBody = $("#dashboard-table-body");
  const totalHTML = $("#dashboard-table-total");
  let total = 0;

  // stored variable was defined in data.js
  if (stored.length > 0) {
    tBody.empty();
    stored.map((value, index) => {
      tBody.append(`
        <tr>
          <td>${value.device}</td>
          <td>${value.macAddress}</td>
          <td>${value.ip}</td>
          <td>${value.createdDate}</td>
          <td>${value.power}</td>
        </tr>            
      `);

      total += value.power;
    });

    totalHTML.text(total);
  }
}

const addDevice = ()=>{
  const name = document.getElementById('name').value;
  const ip = document.getElementById('ip').value;
  const ipRegex = new RegExp(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g);

  console.log(!ipRegex.test(ip));
  
  if(name.trim() === ''){
    notification(
      "Add failed!",
      "Device name are not inputted yet!",
      "error",
      10000,
    );
    return;
  } 
  if(!ipRegex.test(ip)){
    console.log(!ipRegex.test(ip));
    notification(
      "Add failed!",
      "Device IP are not correct! Example IP addresses:<br/>"
      +"127.0.0.1<br/>"
      +"192.168.1.1<br/>"
      +"192.168.1.255<br/>"
      +"255.255.255.255<br/>"
      +"0.0.0.0",
      "error",
      10000,
    );
    // return;
  }
  if(name.trim() !== ''  && ipRegex.test(ip)){
    let lastMacAddress = stored[stored.length-1].macAddress;
    lastMacAddress = lastMacAddress.substr(0, lastMacAddress.length -1 )
      + (lastMacAddress[lastMacAddress.length -1] *1 +1);

    let yourDate = new Date()
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset*60*1000))

    data.push({
      device: name,
      macAddress: lastMacAddress,
      ip,
      createdDate: yourDate.toISOString().split('T')[0],
      power: Math.floor((Math.floor(Math.random() * 100) + 10) / 10) * 10,
    })

    localStorage.setItem("devices", JSON.stringify(data));
    stored = JSON.parse(localStorage.getItem("devices"));

    loadTableDashboard()
    loadChart()
  }
}


