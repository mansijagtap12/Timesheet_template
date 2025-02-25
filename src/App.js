import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Admin/pages/Navbar";
import Sidebar from "./components/Admin/pages/Sidebar";
import ProtectedRoute from "./components/Admin/pages/ProtectedRoute";
import Dashboard from "./components/Admin/pages/Dashboard";
import EmployeeList from "./components/Admin/pages/EmployeeList";
import EmpRegistrationFrom from "./components/Admin/pages/EmpRegistrationFrom";
import EmployeeProfile from "./components/Admin/pages/EmployeeProfile";
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
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <EmployeeList />
                </div>
              </ProtectedRoute>
            }
          />

          {/* Employee Registration Form Page */}
          <Route
            path="/Employee-Registration-Form"
            element={
              <ProtectedRoute>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <EmpRegistrationFrom />
                </div>
              </ProtectedRoute>
            }
          />

          {/* ✅ Fix: Corrected Route Definition for Employee Profile */}
          <Route path="/Employee-profile/:id" element={<ProtectedRoute>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <EmployeeProfile />
                </div>
              </ProtectedRoute>} />


          {/* ✅ Fix: Ensure All Routes Have Leading "/" */}
          <Route
            path="/Employee-weekly-timesheet"
            element={
              <ProtectedRoute>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <WeeklyTimesheetForm />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Employee-weekly-timesheetTable"
            element={
              <ProtectedRoute>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <WeeklyTimesheetTable />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Employee-monthly-timesheet"
            element={
              <ProtectedRoute>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <MonthlyTimesheetForm />
                </div>
              </ProtectedRoute>
            }
          />

          {/* Other Routes */}
          <Route
            path="/Employee-monthlyTs-list"
            element={
              <ProtectedRoute>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <MonthlyTimesheetList />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Employee-weeklyTs-list"
            element={
              <ProtectedRoute>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <WeeklyTimesheetList />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ChartJSComponent"
            element={
              <ProtectedRoute>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <ChartJSComponent />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ProjectRegistrationForm"
            element={
              <ProtectedRoute>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <ProjectRegistrationForm />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Project-List"
            element={
              <ProtectedRoute>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <ProjectList />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/User-profile"
            element={
              <ProtectedRoute>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <UserProfile />
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
