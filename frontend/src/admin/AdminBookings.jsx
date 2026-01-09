import React from "react";

const AdminBookings = () => {
  return (
    <div className="dash-panel">
      <div className="dash-panel-header">
        <h2>All Bookings</h2>
      </div>
      <table className="dash-table">
        <thead>
          <tr>
            <th>Member</th>
            <th>Class</th>
            <th>Trainer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Emma Wilson</td>
            <td>Yoga Flow</td>
            <td>Sarah Lee</td>
            <td>May 24</td>
            <td>18:00</td>
            <td>Studio A</td>
          </tr>
          <tr>
            <td>Liam Smith</td>
            <td>HIIT Training</td>
            <td>James Cole</td>
            <td>May 25</td>
            <td>12:00</td>
            <td>Main Gym</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;
