import React from "react";

const UserProfile = () => {
  return (
    <div className="dash-panel">
      <div className="dash-panel-header">
        <h2>Profile</h2>
      </div>

      <form className="auth-form" style={{ maxWidth: "420px" }}>
        <div className="form-group">
          <label htmlFor="up-name">Full Name</label>
          <input id="up-name" type="text" defaultValue="Jamie Brown" />
        </div>
        <div className="form-group">
          <label htmlFor="up-email">Email</label>
          <input id="up-email" type="email" defaultValue="jamie@gymora.com" />
        </div>
        <div className="form-group">
          <label htmlFor="up-phone">Phone</label>
          <input id="up-phone" type="text" defaultValue="+1 (555) 123-4567" />
        </div>

        <button type="button" className="btn btn-auth-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
