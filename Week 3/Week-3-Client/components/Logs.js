const Logs = () => {
  return (
    <div class="logs-container">
      <div class="top">
        <div class="left">
          <h2>Action Logs</h2>
        </div>

        <div class="right">
          <input type="text" id="search" name="search" placeholder="Name" />
          <button onclick="search()" type="button">
            Search
          </button>
        </div>
      </div>

      <div class="center">
        <table class="data-table">
          <thead>
            <tr>
              <th>Device ID #</th>
              <th>Name</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody id="logs-table-body"></tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td colspan="2"></td>
              <td id="logs-table-total"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="bottom" id="pagination"></div>

      <div class="select-rows-table">
        <label for="setRowsPerPage">Rows per page: </label>
        <input
          type="number"
          id="setRowsPerPage"
          name="setRowsPerPage"
          placeholder="Rows number"
        />
        <button id="setRowsBtn" onclick="setRowsPerPage()" type="button">
          Set
        </button>
      </div>
    </div>
  );
};

export default Logs;
