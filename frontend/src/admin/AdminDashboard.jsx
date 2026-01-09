import React from "react";

const AdminDashboard = () => {
  return (
    <div className="dash-grid">
      {/* stat kártyák */}
      <div className="dash-stats-row">
        <div className="dash-stat-card">
          <div className="dash-stat-label">Active Members</div>
          <div className="dash-stat-value">428</div>
          <div className="dash-stat-sub">+18 this week</div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-label">Bookings Today</div>
          <div className="dash-stat-value">72</div>
          <div className="dash-stat-sub">12 classes</div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-label">Monthly Revenue</div>
          <div className="dash-stat-value">$12.4k</div>
          <div className="dash-stat-sub">+8% vs last month</div>
        </div>
      </div>

      {/* diagram + toplista */}
      <div className="dash-middle-row">
        <div className="dash-panel">
          <div className="dash-panel-header">
            <h2>Weekly Attendance</h2>
          </div>
          <div className="dash-chart-placeholder">
            <div className="chart-bar-row">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
                const heights = [40, 75, 55, 90, 60, 48, 70];
                return (
                  <div key={d} className="chart-bar-wrapper">
                    <div
                      className="chart-bar"
                      style={{ height: `${heights[i]}%` }}
                    />
                    <span className="chart-bar-label">{d}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="dash-panel dash-panel-small">
          <div className="dash-panel-header">
            <h2>Top Classes</h2>
          </div>
          <ul className="dash-list">
            <li>
              <span>HIIT Training</span>
              <span>24 bookings</span>
            </li>
            <li>
              <span>Yoga Flow</span>
              <span>19 bookings</span>
            </li>
            <li>
              <span>Strength Circuit</span>
              <span>17 bookings</span>
            </li>
          </ul>
        </div>
      </div>

      {/* legutóbbi foglalások tábla */}
      <div className="dash-panel">
        <div className="dash-panel-header">
          <h2>Recent Bookings</h2>
        </div>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Class</th>
              <th>Trainer</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Emma Wilson</td>
              <td>Yoga Flow</td>
              <td>Sarah Lee</td>
              <td>May 23</td>
              <td>10:00</td>
              <td className="status-pill status-success">Confirmed</td>
            </tr>
            <tr>
              <td>Liam Smith</td>
              <td>HIIT Training</td>
              <td>James Cole</td>
              <td>May 23</td>
              <td>12:00</td>
              <td className="status-pill status-success">Confirmed</td>
            </tr>
            <tr>
              <td>Sophia Brown</td>
              <td>Pilates</td>
              <td>Anna Fox</td>
              <td>May 23</td>
              <td>14:00</td>
              <td className="status-pill status-pending">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
