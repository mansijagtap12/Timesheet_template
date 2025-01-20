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
import "./App.css"; // Optional: Add any global styles for the app

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Sign-In Page */}
          <Route path="/" element={<SignInForm />} />
          <Route path="/login" element={<SignInForm1 />} />

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
        </Routes>
        {/* Footer */}
      
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
