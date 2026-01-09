import React from "react";

const TrainerClients = () => {
  return (
    <div className="dash-panel">
      <div className="dash-panel-header">
        <h2>My Clients</h2>
      </div>
      <table className="dash-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Goal</th>
            <th>Sessions / Week</th>
            <th>Last Session</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Michael Clark</td>
            <td>Weight loss</td>
            <td>3</td>
            <td>May 21</td>
          </tr>
          <tr>
            <td>Emily Davis</td>
            <td>Strength</td>
            <td>2</td>
            <td>May 20</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TrainerClients;
