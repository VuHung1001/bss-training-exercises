import React from "react";

const TablePrices = () => {
  return (
    <div className="table-container">
      <div className="table-title">
        <p>Show product pricing details</p>
      </div>
      <table className="table-price">
        <thead>
          <tr>
            <td>Title</td>
            <td>Modified Price</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>t shirt</td>
            <td>all variant prices -20%</td>
          </tr>
          <tr>
            <td>Gift Card</td>
            <td>all variant prices -20%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablePrices;
