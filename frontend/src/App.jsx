import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import OurStoryPage from "./pages/OurStoryPage";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";

const AppLayout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="app-root">
      {!isAuthPage && <Navbar />}

      <main className={isAuthPage ? "page-main auth-main" : "page-main"}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => <AppLayout />;

export default App;
