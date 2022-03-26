import { useState, useCallback, useEffect } from "react";
import {addDevice, removeDevice} from '../call_api/dashboardAPI'
import Notification from "./Notification";
// import Script from 'next/script'
// import useScript from '../hooks/useScript';

const DashboardCom = ({props}) => {
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js')
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js')

  const [devices, setDevices] = useState(props.devices)
  const [deviceData, setDeviceData] = useState([])
  const [ipData, setIpData] = useState([])
  const [myChart , setMyChart] = useState(null)
  const [isChartChanged, setIsChartChanged] = useState(true)
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('info');
  const [duration, setDuration] = useState(5000);  

  const loadDashboardTable = useCallback(()=>{
    const tBody = $("#dashboard-table-body");
    const totalHTML = $("#dashboard-table-total");
    let total = 0;
  
    if (devices.length > 0) {
      tBody.empty();
  
      // append row into table
      devices.map((value, index) => {
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
        $(`.button-delete-${index}`).click(()=>removeDeviceHandle(index))
        
        // add onclick event handler to edit button
        $(`.button-edit-${index}`).click(()=>editDeviceHandle(index))
        
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
  }, [devices])

  const removeDeviceHandle = async (index) =>{
    if(confirm('Are you really want remove this device? Can not return!')){

      const res = await removeDevice(index)

      if(!res?.error){
        setDevices(res.devices)
        setIsChartChanged(true)

        setTitle( "Remove device Complete!")
        setMessage("Device table and chart are reloaded")
        setType("warning")
        setDuration(5000)      
        
        const timeout = setTimeout(() =>{
          setTitle( "")
          setMessage("")
          setType("info")
          setDuration(5000)

          window.clearTimeout(timeout)
        }, 5000)
      }    
    } else return;
  }

  const editDeviceHandle = (index) =>{
    
  }

  const loadChart = useCallback(()=>{
    myChart && isChartChanged && setMyChart(prev=>{
      prev.destroy();
      return null;
    })

    if(isChartChanged && !myChart){
      let powerData=[];
      let deviceData=[];
      let ipData=[];
      
      if (devices.length > 0) {
        devices.map((value, index) => {
          powerData[index] = value.power;
          deviceData[index] = value.device;
          ipData[index] = value.ip;
        });
      }
    
      const dataChart = {
        labels: deviceData,
        datasets: [
          {
            label: "Dataset 1",
            data: powerData,
            backgroundColor: [
              "rgb(255, 95, 129, 0.6)",
              "rgb(255, 159, 64, 0.6)",
              "rgb(75, 192, 192, 0.6)",
              "rgb(54, 162, 235, 0.6)",
              "rgb(255, 206, 86, 0.6)",
              "rgb(153, 102, 255, 0.6)",
            ],
          },
        ],
      };
    
      const config = {
        type: "doughnut",
        data: dataChart,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Power Consumption",
            },
          },
        },
      };
    
      setMyChart(new Chart(document.getElementById("myChart"), config))

      setDeviceData(deviceData)
      setIpData(ipData)
      setIsChartChanged(false)
    }
  }, [ devices, myChart, isChartChanged])

  
  const addDeviceHandle = async()=>{

    const name = $('#name').val();
    const ip = $('#ip').val();
    const ipRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/g; // regexp to test ip address
    let isError = false;
  
    ipRegex.test(ip) // must run this line for the condition in IF to run properly
    // if name is empty
    if(name.trim() === ''){

      setTitle( "Add failed!")
      setMessage("Device name is not inputted yet!")
      setType("error")
      setDuration(5000)

      isError = true;
      $('#name').focus();

      const timeout = setTimeout(() =>{
        setTitle( "")
        setMessage("")
        setType("info")
        setDuration(5000)

        window.clearTimeout(timeout)
      }, 5000)
      return;
    }
  
    ipRegex.test(ip) // must run this line for the condition in IF to run properly
    // if ip is not correct format
    if(ipRegex.test(ip) === false){

      setTitle( "Add failed!")
      setMessage("Device IP is not correct! Example IP addresses:<br/>"
        +"127.0.0.1<br/>"
        +"192.168.1.1<br/>"
        +"192.168.1.255<br/>"
        +"255.255.255.255<br/>"
        +"0.0.0.0",)
      setType("error")
      setDuration(5000)

      isError = true;
      $('#ip').focus();

      const timeout = setTimeout(() =>{
        setTitle( "")
        setMessage("")
        setType("info")
        setDuration(5000)

        window.clearTimeout(timeout)
      }, 5000)
      return;
    }
  
    if(isError) {
      $('#name').focus();
      return;
    }; // error is existed, return this function
  
    ipRegex.test(ip) // must run this line for the condition in IF to run properly
    if(name.trim() !== '' && ipRegex.test(ip)){
  
  
      // name and ip must be unique
      if(deviceData.includes(name)){

        setTitle( "Add failed!")
        setMessage("Device name is existed!")
        setType("error")
        setDuration(5000)

        isError = true;
        $('#name').focus();

        const timeout = setTimeout(() =>{
          setTitle( "")
          setMessage("")
          setType("info")
          setDuration(5000)
  
          window.clearTimeout(timeout)
        }, 5000)
        return;
      }
      
      if(ipData.includes(ip)){
        setTitle( "Add failed!")
        setMessage("Device ip is existed!")
        setType("error")
        setDuration(5000)

        isError = true;
        $('#ip').focus();

        const timeout = setTimeout(() =>{
          setTitle( "")
          setMessage("")
          setType("info")
          setDuration(5000)
  
          window.clearTimeout(timeout)
        }, 5000)
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
  
      // add device object to devices array in db
      const res = await addDevice({
          device: name,
          macAddress: macAddress,
          ip,
          createdDate: yourDate.toISOString().split('T')[0],
          power: Math.floor((Math.floor(Math.random() * 100) + 10) / 10) * 10, // power is random number can divisible by 10        
      })

      if(!res?.error){
        setDevices(res.devices)
        setIsChartChanged(true)

        setTitle( "Add device Success!")
        setMessage("Device table and chart are reloaded")
        setType("success")
        setDuration(5000)      
        
        const timeout = setTimeout(() =>{
          setTitle( "")
          setMessage("")
          setType("info")
          setDuration(5000)
  
          window.clearTimeout(timeout)
        }, 5000)
      }
  
      $('#name').val('');
      $('#ip').val('');
    }
  }


  useEffect(()=>{
    loadChart();
    loadDashboardTable();
  }, [loadDashboardTable, loadChart])

  return (
    <div className="dashboard-container">
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        strategy='beforeInteractive'
      ></Script>      */}
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"
        strategy='beforeInteractive'
      ></Script>       */}
    {title !== '' && message !== '' && type !== 'info' &&(
      <Notification
        title={title}
        message={message}
        type={type}
        duration={duration}            
      />
    )}    
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Devices</th>
              <th>MAC Address</th>
              <th>IP</th>
              <th>Created Date</th>
              <th>Power Consumption (Kw/H)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="dashboard-table-body"></tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td colSpan="3"></td>
              <td id="dashboard-table-total"></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="bottom">
        <div className="chart-container">
          <canvas id="myChart"></canvas>
        </div>

        <div className="add_device-container">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
          />
          <input type="text" id="ip" name="ip" placeholder="IP" required />
          <button type="button" onClick={addDeviceHandle}>
            ADD DEVICE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCom;
