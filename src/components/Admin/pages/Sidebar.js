import React from "react";

const Sidebar = () => {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <a href="#" className="nav-link">
            <div className="nav-profile-image">
              <img src="assets/images/emp/hr_default.jpg" alt="profile" />
              <span className="login-status online"></span>
              {/* change to offline or busy as needed */}
            </div>
            <div className="nav-profile-text d-flex flex-column">
              <span className="font-weight-bold mb-2">SEJAL AHIRE </span>
              <span className="text-secondary text-small">Human Resource</span>
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="dashboard">
            <span className="menu-title">Dashboard</span>
            <i className="mdi mdi-home menu-icon"></i>
          </a>
        </li>
        {/* <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#ui-basic"
            aria-expanded="false"
            aria-controls="ui-basic"
          >
            <span className="menu-title">Basic UI Elements</span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-crosshairs-gps menu-icon"></i>
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <a className="nav-link" href="pages/ui-features/buttons.html">
                  Buttons
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/ui-features/dropdowns.html">
                  Dropdowns
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/ui-features/typography.html">
                  Typography
                </a>
              </li>
            </ul>
          </div>
        </li> */}
        {/* <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#icons"
            aria-expanded="false"
            aria-controls="icons"
          >
            <span className="menu-title">Icons</span>
            <i className="mdi mdi-contacts menu-icon"></i>
          </a>
          <div className="collapse" id="icons">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <a className="nav-link" href="pages/icons/font-awesome.html">
                  Font Awesome
                </a>
              </li>
            </ul>
          </div>
        </li> */}

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#tables"
            aria-expanded="false"
            aria-controls="tables"
          >
            {" "}
            <span className="menu-title">Employees</span>
            <i className="mdi mdi-table-large menu-icon"></i>
          </a>
          <div className="collapse" id="tables">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <a className="nav-link" href="Employee-Registration-Form">
                  Register Employee
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="employee-list">
                  EmployeeList
                </a>
              </li>
            </ul>
          </div>
        </li>
       <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#charts"
            aria-expanded="false"
            aria-controls="charts"
          >
            <span className="menu-title">Projects</span>
            <i className="mdi mdi-chart-bar menu-icon"></i>
          </a>
          <div className="collapse" id="charts">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <a className="nav-link" href="ProjectRegistrationForm">
                  Add Project
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="Project-List">
                  Project List
                </a>
              </li>
            </ul>
          </div>
        </li> 
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#timesheet"
            aria-expanded="false"
            aria-controls="timesheet"
          >
            <span className="menu-title">Timesheets</span>
            <i className="mdi mdi-timer-sand menu-icon"></i>
          </a>
          <div className="collapse" id="timesheet">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <a className="nav-link" href="Employee-monthly-timesheet">
                  Monthly Timesheet
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="Employee-weekly-timesheet">
                  Weekly Timesheet
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="Employee-weekly-timesheetTable">
                  Weekly Timesheet data table
                </a>
              </li> */}
            </ul>
          </div>
        </li>
        
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#charts"
            aria-expanded="false"
            aria-controls="charts"
          >
            <span className="menu-title">Charts</span>
            <i className="mdi mdi-chart-bar menu-icon"></i>
          </a>
          <div className="collapse" id="charts">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <a className="nav-link" href="ChartJSComponent">
                  ChartJs
                </a>
              </li>
            </ul>
          </div>
        </li>
        {/* <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#auth"
            aria-expanded="false"
            aria-controls="auth"
          ><span className="menu-title">User Pages</span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-lock menu-icon"></i>
          </a>
          <div className="collapse" id="auth">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <a className="nav-link" href="pages/samples/blank-page.html">
                  Blank Page
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/samples/login.html">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/samples/register.html">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/samples/error-404.html">
                  404
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/samples/error-500.html">
                  500
                </a>
              </li>
            </ul>
          </div>
        </li> */}
      </ul>
    </nav>
  );
};

export default Sidebar;
