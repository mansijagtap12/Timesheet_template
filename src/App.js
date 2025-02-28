// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import ProtectedRoute from "./components/Admin/pages/ProtectedRoute";
import Layout from "./components/Admin/pages/Layout"; // Import the new Layout component
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

// Component for protected routes with nested routes
const ProtectedLayout = () => (
  <ProtectedRoute>
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Employee-List" element={<EmployeeList />} />
        <Route path="/Employee-Registration-Form" element={<EmpRegistrationFrom />} />
        <Route path="/Employee-profile/:id" element={<EmployeeProfile />} />
        <Route path="/Employee-weekly-timesheet" element={<WeeklyTimesheetForm />} />
        <Route path="/Employee-weekly-timesheetTable" element={<WeeklyTimesheetTable />} />
        <Route path="/Employee-monthly-timesheet" element={<MonthlyTimesheetForm />} />
        <Route path="/Employee-monthlyTs-list" element={<MonthlyTimesheetList />} />
        <Route path="/Employee-weeklyTs-list" element={<WeeklyTimesheetList />} />
        <Route path="/ChartJSComponent" element={<ChartJSComponent />} />
        <Route path="/ProjectRegistrationForm" element={<ProjectRegistrationForm />} />
        <Route path="/Project-List" element={<ProjectList />} />
        <Route path="/User-profile" element={<UserProfile />} />
      </Routes>
    </Layout>
  </ProtectedRoute>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<SignInForm1 />} />
          <Route path="/" element={<SignInForm />} />

          {/* Protected Routes with Persistent Layout */}
          <Route path="/*" element={<ProtectedLayout />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;