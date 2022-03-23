import { useState } from "react";


const DashboardCom = ({props}) => {
  const [devices, setDevices] = useState(props.devices)
  

  return (
    <div className="dashboard-container">
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
          <button type="button" onClick="addDevice()">
            ADD DEVICE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCom;
