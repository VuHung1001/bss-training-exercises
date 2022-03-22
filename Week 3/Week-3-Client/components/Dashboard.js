
const Dashboard = () => {
  return (
    <div class="dashboard-container">
      <div class="data-table-container">
        <table class="data-table">
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
              <td colspan="3"></td>
              <td id="dashboard-table-total"></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="bottom">
        <div class="chart-container">
          <canvas id="myChart"></canvas>
        </div>

        <div class="add_device-container">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
          />
          <input type="text" id="ip" name="ip" placeholder="IP" required />
          <button type="button" onclick="addDevice()">
            ADD DEVICE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
