const LogsCom = () => {
  return (
    <div className="logs-container">
      <div className="top">
        <div className="left">
          <h2>Action Logs</h2>
        </div>

        <div className="right">
          <input type="text" id="search" name="search" placeholder="Name" />
          <button onclick="search()" type="button">
            Search
          </button>
        </div>
      </div>

      <div className="center">
        <table className="data-table">
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
              <td colSpan="2"></td>
              <td id="logs-table-total"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="bottom" id="pagination"></div>

      <div className="select-rows-table">
        <label htmlFor="setRowsPerPage">Rows per page: </label>
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

export default LogsCom;
