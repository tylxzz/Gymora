import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FiCalendar, FiUsers } from "react-icons/fi";

const TrainerLayout = () => {
  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">GYMORA</div>
        <nav className="sidebar-menu">
          <NavLink end to="/trainer" className="sidebar-item">
            <MdOutlineDashboard className="sidebar-icon" />
            <span>Dashboard</span>
          </NavLink>

          <span className="sidebar-label">Trainer</span>

          <NavLink to="/trainer/schedule" className="sidebar-item">
            <FiCalendar className="sidebar-icon" />
            <span>My Schedule</span>
          </NavLink>

          <NavLink to="/trainer/clients" className="sidebar-item">
            <FiUsers className="sidebar-icon" />
            <span>My Clients</span>
          </NavLink>
        </nav>
      </aside>

      <div className="dashboard-content">
        <header className="dashboard-topbar">
          <h1 className="dashboard-title">Trainer</h1>
          <div className="topbar-user">
            <div className="topbar-user-info">
              <span className="topbar-user-name">Taylor Reed</span>
              <span className="topbar-user-role">Trainer</span>
            </div>
            <div className="topbar-avatar">TR</div>
          </div>
        </header>

        <div className="dashboard-page">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TrainerLayout;
