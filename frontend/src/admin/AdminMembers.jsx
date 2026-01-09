import React from "react";

const AdminMembers = () => {
  return (
    <div className="dash-panel">
      <div className="dash-panel-header">
        <h2>Members</h2>
      </div>
      <table className="dash-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Membership</th>
            <th>Joined</th>
            <th>Last Visit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Emma Wilson</td>
            <td>Premium</td>
            <td>Jan 12</td>
            <td>May 23</td>
          </tr>
          <tr>
            <td>Liam Smith</td>
            <td>Standard</td>
            <td>Feb 03</td>
            <td>May 22</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminMembers;
