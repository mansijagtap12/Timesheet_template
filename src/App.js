import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Admin/pages/Navbar";
import Sidebar from "./components/Admin/pages/Sidebar";
import Dashboard from "./components/Admin/pages/Dashboard";
import EmployeeList from "./components/Admin/pages/EmployeeList";
import EmpRegistrationFrom from "./components/Admin/pages/EmpRegistrationFrom";
import ChartJSComponent from "./components/Admin/pages/ChartJSComponent";
import Footer from "./components/Footer";
import SignInForm from "./components/SignInForm";
import SignInForm1 from "./components/SignInForm1";
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
