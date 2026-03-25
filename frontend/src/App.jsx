import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Consultation from "./components/Consultation";
import Team from "./components/Team";
import Works from "./components/Works";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminFeatures from "./pages/AdminFeatures";
import AdminConsultations from "./pages/AdminConsultations";
import AdminTeam from "./pages/AdminTeam";
import AdminWorks from "./pages/AdminWorks";

function HomePage({ theme, onToggleTheme }) {
  return (
    <>
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      <Hero />
      <Features />
      <HowItWorks />
      <Consultation />
      <Team />
      <Works />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("gps_theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("gps_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage theme={theme} onToggleTheme={toggleTheme} />}
      />

      <Route path="/admin" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route path="features" element={<AdminFeatures />} />
        <Route path="consultations" element={<AdminConsultations />} />
        <Route path="team" element={<AdminTeam />} />
        <Route path="works" element={<AdminWorks />} />
      </Route>
    </Routes>
  );
}

export default App;