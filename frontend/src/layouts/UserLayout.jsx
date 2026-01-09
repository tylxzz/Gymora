import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FiCalendar, FiCreditCard, FiUser } from "react-icons/fi";

const UserLayout = () => {
  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">GYMORA</div>
        <nav className="sidebar-menu">
          <NavLink end to="/user" className="sidebar-item">
            <MdOutlineDashboard className="sidebar-icon" />
            <span>Overview</span>
          </NavLink>

          <span className="sidebar-label">My Gym</span>

          <NavLink to="/user/bookings" className="sidebar-item">
            <FiCalendar className="sidebar-icon" />
            <span>Bookings</span>
          </NavLink>

          <NavLink to="/user/membership" className="sidebar-item">
            <FiCreditCard className="sidebar-icon" />
            <span>Membership</span>
          </NavLink>

          <NavLink to="/user/profile" className="sidebar-item">
            <FiUser className="sidebar-icon" />
            <span>Profile</span>
          </NavLink>
        </nav>
      </aside>

      <div className="dashboard-content">
        <header className="dashboard-topbar">
          <h1 className="dashboard-title">Member</h1>
          <div className="topbar-user">
            <div className="topbar-user-info">
              <span className="topbar-user-name">Jamie Brown</span>
              <span className="topbar-user-role">Member</span>
            </div>
            <div className="topbar-avatar">JB</div>
          </div>
        </header>

        <div className="dashboard-page">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
