import React from "react";

const TrainerDashboard = () => {
  return (
    <div className="dash-grid">
      <div className="dash-stats-row">
        <div className="dash-stat-card">
          <div className="dash-stat-label">Today&apos;s Classes</div>
          <div className="dash-stat-value">4</div>
          <div className="dash-stat-sub">First class at 08:00</div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-label">Total Clients</div>
          <div className="dash-stat-value">32</div>
          <div className="dash-stat-sub">5 new this month</div>
        </div>
      </div>

      <div className="dash-panel">
        <div className="dash-panel-header">
          <h2>Today&apos;s Schedule</h2>
        </div>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Class</th>
              <th>Location</th>
              <th>Bookings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>08:00</td>
              <td>HIIT Training</td>
              <td>Main Studio</td>
              <td>10 / 12</td>
            </tr>
            <tr>
              <td>10:00</td>
              <td>Functional Strength</td>
              <td>Gym Floor</td>
              <td>8 / 10</td>
            </tr>
            <tr>
              <td>16:00</td>
              <td>Core &amp; Mobility</td>
              <td>Studio B</td>
              <td>12 / 12</td>
            </tr>
            <tr>
              <td>18:00</td>
              <td>Small Group PT</td>
              <td>Gym Floor</td>
              <td>5 / 6</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="dash-panel dash-panel-small">
        <div className="dash-panel-header">
          <h2>Upcoming 1:1 Sessions</h2>
        </div>
        <ul className="dash-list">
          <li>
            <span>Michael Clark</span>
            <span>Tomorrow · 09:00</span>
          </li>
          <li>
            <span>Emily Davis</span>
            <span>Tomorrow · 17:30</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TrainerDashboard;
