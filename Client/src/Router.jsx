import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./App/Pages/Dashboard";
import AreaPage from "./App/Pages/Area";
import ComplaintPage from "./App/Pages/Complaint";
import ReservationPage from "./App/Pages/Reservation";
import ResourceRequestPage from "./App/Pages/Resource_Request";
import ResourceTypePage from "./App/Pages/Resource_Type";
import ResourcePage from "./App/Pages/Resource";
import UserPage from "./App/Pages/User";
import Navbar from "./App/Components/Navbar/Navbar";

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/area" element={<AreaPage />} />
        <Route path="/complaint" element={<ComplaintPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/resource_request" element={<ResourceRequestPage />} />
        <Route path="/resource_type" element={<ResourceTypePage />} />
        <Route path="/resource" element={<ResourcePage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
