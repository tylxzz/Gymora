import React from "react";

const AdminLocations = () => {
  return (
    <div className="dash-panel">
      <div className="dash-panel-header">
        <h2>Locations</h2>
      </div>
      <table className="dash-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Main Gym</td>
            <td>123 Fitness St, NY</td>
            <td>250</td>
          </tr>
          <tr>
            <td>Studio A</td>
            <td>123 Fitness St, NY</td>
            <td>40</td>
          </tr>
          <tr>
            <td>Studio B</td>
            <td>123 Fitness St, NY</td>
            <td>30</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminLocations;
