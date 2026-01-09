const UserBookings = () => {
  return (
    <div className="dash-panel">
      <div className="dash-panel-header">
        <h2>My Bookings</h2>
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
            <td>Main Gym</td>
            <td className="status-pill status-success">Booked</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserBookings;
