import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./App/Context/AuthContext";
import DashboardPage from "./App/Pages/Dashboard";
import AreaPage from "./App/Pages/Area";
import ComplaintPage from "./App/Pages/Complaint";
import ReservationPage from "./App/Pages/Reservation";
import ResourceRequestPage from "./App/Pages/Resource_Request";
import ResourceTypePage from "./App/Pages/Resource_Type";
import ResourcePage from "./App/Pages/Resource";
import UserPage from "./App/Pages/User";
import TeamPage from "./App/Pages/Team";
import LoginPage from "./App/Pages/LoginPage";
import ProtectedRoute from "./App/Components/ProtectedRoute/ProtectedRoute";

const RouterComponent = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<DashboardPage />} />}
          />
          <Route
            path="/area"
            element={<ProtectedRoute element={<AreaPage />} />}
          />
          <Route
            path="/complaint"
            element={<ProtectedRoute element={<ComplaintPage />} />}
          />
          <Route
            path="/reservation"
            element={<ProtectedRoute element={<ReservationPage />} />}
          />
          <Route
            path="/resource_request"
            element={<ProtectedRoute element={<ResourceRequestPage />} />}
          />
          <Route
            path="/resource_type"
            element={<ProtectedRoute element={<ResourceTypePage />} />}
          />
          <Route
            path="/resource"
            element={<ProtectedRoute element={<ResourcePage />} />}
          />
          <Route
            path="/user"
            element={<ProtectedRoute element={<UserPage />} />}
          />
          <Route
            path="/team"
            element={<ProtectedRoute element={<TeamPage />} />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default RouterComponent;
