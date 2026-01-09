const UserDashboard = () => {
  return (
    <div className="dash-grid">
      <div className="dash-stats-row">
        <div className="dash-stat-card">
          <div className="dash-stat-label">Active Membership</div>
          <div className="dash-stat-value">Premium</div>
          <div className="dash-stat-sub">Renews on Jun 30</div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-label">Upcoming Bookings</div>
          <div className="dash-stat-value">3</div>
          <div className="dash-stat-sub">Next: Yoga · Today 18:00</div>
        </div>
      </div>

      <div className="dash-panel">
        <div className="dash-panel-header">
          <h2>My Upcoming Classes</h2>
        </div>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Class</th>
              <th>Trainer</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>May 24 · 18:00</td>
              <td>Yoga Flow</td>
              <td>Sarah Lee</td>
              <td>Studio A</td>
              <td className="status-pill status-success">Booked</td>
            </tr>
            <tr>
              <td>May 26 · 07:30</td>
              <td>Morning HIIT</td>
              <td>James Cole</td>
              <td>Main Studio</td>
              <td className="status-pill status-success">Booked</td>
            </tr>
            <tr>
              <td>May 28 · 19:00</td>
              <td>Pilates</td>
              <td>Anna Fox</td>
              <td>Studio B</td>
              <td className="status-pill status-pending">Waitlist</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="dash-panel dash-panel-small">
        <div className="dash-panel-header">
          <h2>Recommended for You</h2>
        </div>
        <ul className="dash-list">
          <li>
            <span>Strength Circuit</span>
            <span>Great for building power</span>
          </li>
          <li>
            <span>Mobility &amp; Stretch</span>
            <span>Improve flexibility</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
