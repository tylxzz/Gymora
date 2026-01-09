import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdOutlinePeople,
  MdOutlinePlace,
} from "react-icons/md";
import { FiCalendar, FiBarChart2, FiCreditCard } from "react-icons/fi";

const AdminLayout = () => {
  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">GYMORA</div>
        <nav className="sidebar-menu">
          <NavLink end to="/admin" className="sidebar-item">
            <MdOutlineDashboard className="sidebar-icon" />
            <span>Dashboard</span>
          </NavLink>

          <span className="sidebar-label">Management</span>

          <NavLink to="/admin/trainers" className="sidebar-item">
            <MdOutlinePeople className="sidebar-icon" />
            <span>Trainers</span>
          </NavLink>

          <NavLink to="/admin/members" className="sidebar-item">
            <MdOutlinePeople className="sidebar-icon" />
            <span>Members</span>
          </NavLink>

          <NavLink to="/admin/locations" className="sidebar-item">
            <MdOutlinePlace className="sidebar-icon" />
            <span>Locations</span>
          </NavLink>

          <NavLink to="/admin/memberships" className="sidebar-item">
            <FiCreditCard className="sidebar-icon" />
            <span>Memberships</span>
          </NavLink>

          <NavLink to="/admin/bookings" className="sidebar-item">
            <FiCalendar className="sidebar-icon" />
            <span>Bookings</span>
          </NavLink>

          <NavLink to="/admin/schedule" className="sidebar-item">
            <FiBarChart2 className="sidebar-icon" />
            <span>Schedule</span>
          </NavLink>
        </nav>
      </aside>

      <div className="dashboard-content">
        <header className="dashboard-topbar">
          <h1 className="dashboard-title">Admin</h1>
          <div className="topbar-user">
            <div className="topbar-user-info">
              <span className="topbar-user-name">Alex Johnson</span>
              <span className="topbar-user-role">Administrator</span>
            </div>
            <div className="topbar-avatar">AJ</div>
          </div>
        </header>

        <div className="dashboard-page">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
