import React from "react";

const UserMembership = () => {
  return (
    <div className="dash-panel">
      <div className="dash-panel-header">
        <h2>My Membership</h2>
      </div>
      <div style={{ fontSize: "0.85rem" }}>
        <p>
          <strong>Type:</strong> Premium
        </p>
        <p>
          <strong>Billing:</strong> Monthly · $59
        </p>
        <p>
          <strong>Renews on:</strong> Jun 30, 2025
        </p>
      </div>
    </div>
  );
};

export default UserMembership;
