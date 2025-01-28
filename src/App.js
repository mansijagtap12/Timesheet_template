import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Admin/pages/Navbar";
import Sidebar from "./components/Admin/pages/Sidebar";
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
import "./App.css"; // Optional: Add any global styles for the app

import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Sign-In Page */}
          <Route path="/login" element={<SignInForm />} />
          <Route path="/" element={<SignInForm1 />} />

          {/* Dashboard Page */}
          <Route
            path="/dashboard"
            element={
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <Dashboard />
                </div>
              </div>
            }
          />

          {/* Employee List Page */}
          <Route
            path="/Employee-List"
            element={
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <EmployeeList />
                </div>
              </div>
            }
          />

          {/* Employee Registration Form Page */}
          <Route
            path="/Employee-Registration-Form"
            element={
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <EmpRegistrationFrom />
                </div>
              </div>
            }
          />

          {/* Employee Weekly Timesheet Page */}
          <Route
            path="/Employee-weekly-timesheet"
            element={
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <WeeklyTimesheetForm />
                </div>
              </div>
            }
          />
          {/* Employee Weekly Timesheet Page */}
          <Route
            path="/Employee-weekly-timesheetTable"
            element={
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <WeeklyTimesheetTable />
                </div>
              </div>
            }
          />
          {/* Employee monthly Timesheet Page */}
          <Route
            path="/Employee-monthly-timesheet"
            element={
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <MonthlyTimesheetForm />
                </div>
              </div>
            }
          />
          {/* Employee monthly Timesheet List  */}
          <Route
            path="/Employee-monthlyTs-list"
            element={
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <MonthlyTimesheetList />
                </div>
              </div>
            }
          />
          {/* Employee Weekly Timesheet List  */}
          <Route
            path="/Employee-weeklyTs-list"
            element={
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <WeeklyTimesheetList />
                </div>
              </div>
            }
          />

          {/* ChartJS Component Page */}
          <Route
            path="/ChartJSComponent"
            element={
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <ChartJSComponent />
                </div>
              </div>
            }
          />
          {/* User Profile */}
          <Route
            path="/User-profile"
            element={
              <div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                  <Sidebar />
                  <UserProfile />
                </div>
              </div>
            }
          />
        </Routes>
        {/* Footer */}
      
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
