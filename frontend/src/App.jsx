import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import OurStoryPage from "./pages/OurStoryPage";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";

import AdminLayout from "./layouts/AdminLayout";
import TrainerLayout from "./layouts/TrainerLayout";
import UserLayout from "./layouts/UserLayout";

// admin
import AdminDashboard from "./admin/AdminDashboard";
import AdminTrainers from "./admin/AdminTrainers";
import AdminMembers from "./admin/AdminMembers";
import AdminLocations from "./admin/AdminLocations";
import AdminMemberships from "./admin/AdminMemberships";
import AdminBookings from "./admin/AdminBookings";
import AdminSchedule from "./admin/AdminSchedule";

// trainer
import TrainerDashboard from "./trainer/TrainerDashboard";
import TrainerSchedule from "./trainer/TrainerSchedule";
import TrainerClients from "./trainer/TrainerClients";

// user
import UserDashboard from "./user/UserDashboard";
import UserBookings from "./user/UserBookings";
import UserMembership from "./user/UserMembership";
import UserProfile from "./user/UserProfile";

const AppInner = () => {
  const location = useLocation();

  const isAuth =
    location.pathname === "/login" || location.pathname === "/register";

  const isDashboard =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/trainer") ||
    location.pathname.startsWith("/user");

  return (
    <div className="app-root">
      {!isAuth && !isDashboard && <Navbar />}

      <main
        className={
          isDashboard ? "dashboard-main" : isAuth ? "auth-main" : "page-main"
        }
      >
        <Routes>
          {/* publikus */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ADMIN */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="trainers" element={<AdminTrainers />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="locations" element={<AdminLocations />} />
            <Route path="memberships" element={<AdminMemberships />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="schedule" element={<AdminSchedule />} />
          </Route>

          {/* TRAINER */}
          <Route path="/trainer" element={<TrainerLayout />}>
            <Route index element={<TrainerDashboard />} />
            <Route path="schedule" element={<TrainerSchedule />} />
            <Route path="clients" element={<TrainerClients />} />
          </Route>

          {/* USER */}
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="bookings" element={<UserBookings />} />
            <Route path="membership" element={<UserMembership />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </main>

      {!isAuth && !isDashboard && <Footer />}
    </div>
  );
};

const App = () => <AppInner />;

export default App;
