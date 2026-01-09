import React from "react";

const TrainerSchedule = () => {
  return (
    <div className="dash-panel">
      <div className="dash-panel-header">
        <h2>My Weekly Schedule</h2>
      </div>
      <p style={{ fontSize: "0.8rem", color: "#6b7280", marginBottom: "8px" }}>
        Overview of all classes assigned to you this week.
      </p>
      {/* újrahasznosíthatnád ugyanazt a schedule-grid komponenst, de most egyszerű tábla */}
      <table className="dash-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Class</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mon</td>
            <td>07:00</td>
            <td>Morning HIIT</td>
            <td>Main Gym</td>
          </tr>
          <tr>
            <td>Wed</td>
            <td>09:00</td>
            <td>Yoga Flow</td>
            <td>Studio A</td>
          </tr>
          <tr>
            <td>Fri</td>
            <td>17:00</td>
            <td>Strength Circuit</td>
            <td>Gym Floor</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TrainerSchedule;
