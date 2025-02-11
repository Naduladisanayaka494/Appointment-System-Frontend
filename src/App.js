import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/DashBoard";
import AdminDashboard from "./pages/Admin/AdminDashbord";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
// import UserEvents from "./pages/UserEvents";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import RegisterAttendee from "./pages/RegisterAttendee";
// import EventPage from "./pages/EventPage";
import SignUp from "./pages/SignUp";
import TimeSlot from "./pages/Admin/TimeSlot";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Admin-Dasboard"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Time-Slot"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <TimeSlot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Admin-Dasboard"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route
            path="/add-atendee"
            element={
              <ProtectedRoute requiredRole="DataEntry">
                <UserEvents />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/register-attendee/:eventId"
            element={
              <ProtectedRoute requiredRole="DataEntry">
                <RegisterAttendee />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/event-handling"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <EventPage />
              </ProtectedRoute>
            }
          /> */}

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
