import React from "react";
import { BrowserRouter as Router, Route, Routes,useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Navbar from "./components/Admin/pages/Navbar";
import Sidebar from "./components/Admin/pages/Sidebar";
import ProtectedRoute from "./components/Admin/pages/ProtectedRoute";
import Dashboard from "./components/Admin/pages/Dashboard";
import EmployeeList from "./components/Admin/pages/EmployeeList";
import EmpRegistrationFrom from "./components/Admin/pages/EmpRegistrationFrom";
import ChartJSComponent from "./components/Admin/pages/ChartJSComponent";
import Footer from "./components/Admin/pages/Footer";
import SignInForm from "./components/SignInForm";
import SignInForm1 from "./components/SignInForm1";
import MonthlyTimesheetForm from "./components/Admin/pages/MonthlyTimesheetForm";
import WeeklyTimesheetForm from "./components/Admin/pages/WeeklyTimesheetForm";
import MonthlyTimesheetList from "./components/Admin/pages/MonthlyTimesheetList";
import WeeklyTimesheetTable from "./components/Admin/pages/WeeklyTimesheetTable";
import WeeklyTimesheetList from "./components/Admin/pages/WeeklyTimesheetList";
import UserProfile from "./components/Admin/pages/UserProfile";

import ProjectRegistrationForm from "./components/Admin/pages/ProjectRegistrationForm";
import ProjectList from "./components/Admin/pages/ProjectList";
import "./App.css"; // Optional: Add any global styles for the app

import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons

function App() {


 
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Sign-In Page */}
          <Route path="/login" element={<SignInForm1 />} />
          <Route path="/" element={<SignInForm />} />

          {/* Dashboard Page */}
          <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Navbar />
            <div className="container-fluid page-body-wrapper">
              <Sidebar />
              <Dashboard />
            </div>
          </ProtectedRoute>
        } 
      />

          {/* Employee List Page */}
          <Route
            path="/Employee-List"
            element={
              <ProtectedRoute>
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <EmployeeList />
                </div>
              </div>
              </ProtectedRoute>
            }
          />

          {/* Employee Registration Form Page */}
          <Route
            path="/Employee-Registration-Form"
            element={
              <ProtectedRoute>
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <EmpRegistrationFrom />
                </div>
              </div>
              </ProtectedRoute>
            }
          />

          {/* Employee Weekly Timesheet Page */}
          <Route
            path="/Employee-weekly-timesheet"
            element={
              <ProtectedRoute>
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <WeeklyTimesheetForm />
                </div>
              </div>
              </ProtectedRoute>
            }
          />
          {/* Employee Weekly Timesheet Page */}
          <Route
            path="/Employee-weekly-timesheetTable"
            element={
              <ProtectedRoute>
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <WeeklyTimesheetTable />
                </div>
              </div>
              </ProtectedRoute>
            }
          />
          {/* Employee monthly Timesheet Page */}
          <Route
            path="/Employee-monthly-timesheet"
            element={
              <ProtectedRoute>
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <MonthlyTimesheetForm />
                </div>
              </div>
              </ProtectedRoute>
            }
          />
          {/* Employee monthly Timesheet List  */}
          <Route
            path="/Employee-monthlyTs-list"
            element={
              <ProtectedRoute>
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <MonthlyTimesheetList />
                </div>
              </div>
              </ProtectedRoute>
            }
          />
          {/* Employee Weekly Timesheet List  */}
          <Route
            path="/Employee-weeklyTs-list"
            element={
              <ProtectedRoute>
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <WeeklyTimesheetList />
                </div>
              </div>
              </ProtectedRoute>
            }
          />

          {/* ChartJS Component Page */}
          <Route
            path="/ChartJSComponent"
            element={
              <ProtectedRoute>
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <ChartJSComponent />
                </div>
              </div>
              </ProtectedRoute>
            }
          />
          {/* ProjectRegistrationForm Component Page */}
          <Route
            path="/ProjectRegistrationForm"
            element={
              <ProtectedRoute>
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <ProjectRegistrationForm />
                </div>
              </div>
              </ProtectedRoute>
            }
          />
          {/* ProjectList Component Page */}
          <Route
            path="/Project-List"
            element={
              <ProtectedRoute>
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <ProjectList />
                </div>
              </div>
              </ProtectedRoute>
            }
          />
          {/* User Profile */}
          <Route
            path="/User-profile"
            element={
              <ProtectedRoute>
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <UserProfile />
                </div>
              </div>
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* Footer */}
      </div>
      <Footer />
    </Router>
  );
}

export default App;
