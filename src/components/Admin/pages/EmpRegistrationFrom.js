import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { Tab, Tabs } from "@mui/material";
import { Table, Button, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaPlus, FaTrash } from "react-icons/fa";

const EmpRegistrationFrom = () => {
  const [activeSection, setActiveSection] = useState("personalInfo"); // Manage active section
  const [rows, setRows] = useState([{}]);
  const [educationData, setEducationData] = useState([]);
  const addRow = () => setRows([...rows, {}]);
  const deleteRow = (index) => setRows(rows.filter((_, i) => i !== index));
  const [formData, setFormData] = useState({
    education: "",
    college: "",
    specialization: "",
    passoutYear: "",
    percentage: "",
  });

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Employee registered successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    setFormData({
      name: "",
      email: "",
      skills: [],
      workLocation: "",
      manager: "",
    });
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const options = [
    { value: "Webmethod", label: "Webmethod" },
    { value: "HTML", label: "HTML" },
    { value: "Java", label: "Java" },
    { value: "CamelK", label: "CamelK" },
  ];
  const Certifications = [
    {
      value: "Webmethod",
      label: "Software AG Certified web Methods Integration Associate",
    },
    { value: "HTML", label: "Flask Python" },
    { value: "Java", label: "SQL" },
    { value: "CamelK", label: "CamelK" },
  ];

  const [activeTab, setActiveTab] = useState(0); // Tab state

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const submitData = () => {
    setEducationData(rows);
    setRows([{}]);
  };

  const columns = [
    {
      name: "Education Level",
      selector: (row) => row.educationLevel,
      sortable: true,
    },
    { name: "College", selector: (row) => row.college, sortable: true },
    {
      name: "Specialization",
      selector: (row) => row.specialization,
      sortable: true,
    },
    {
      name: "Passout Year",
      selector: (row) => row.passoutYear,
      sortable: true,
    },
    { name: "Percentage", selector: (row) => row.percentage, sortable: true },
  ];
  return (
    <div className="content-wrapper">
      <ToastContainer />
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div className="page-header">
              <h5 className="page-title">
                <span className="page-title-icon text-dark me-2">
                  <i className="mdi mdi-pencil-box"></i>
                </span>
                Register Employee
              </h5>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/employee-list">Employee List</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Register Employee
                  </li>
                </ol>
              </nav>
            </div>
            <hr />

            {/* Material-UI Tabs */}
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab label="Employee Details" />

              <Tab label="Education" />
              <Tab label="Project" />
            </Tabs>

            <form className="form-sample">
              {/* Personal Info Section */}
              {activeTab === 0 && (
                <div className="container mt-1 p-2 bg-white shadow-sm rounded">
                  <div className="row">
                    {/* Employee ID */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="employeeId"
                        className="form-label text-start d-block"
                      >
                        Employee ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="employeeId"
                        placeholder="Enter Employee ID"
                        required
                      />
                    </div>

                    {/* Location */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="location"
                        className="form-label text-start d-block"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        placeholder="Enter Location"
                      />
                    </div>
                    {/* Profile pic */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="profile"
                        className="form-label text-start d-block"
                      >
                        Upload profile picture
                      </label>
                      <input type="file" className="form-control" id="Resume" />
                    </div>
                    {/* First Name */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="firstName"
                        className="form-label text-start d-block"
                      >
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Enter First Name"
                        required
                      />
                    </div>

                    {/* Middle Name */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="middleName"
                        className="form-label text-start d-block"
                      >
                        Middle Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="middleName"
                        placeholder="Enter Middle Name"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="lastName"
                        className="form-label text-start d-block"
                      >
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Enter Last Name"
                        required
                      />
                    </div>

                    {/* Mobile Number */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="mobile"
                        className="form-label text-start d-block"
                      >
                        Mobile Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="mobile"
                        placeholder="Enter Mobile Number"
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>

                    {/* Official Email */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="officialEmail"
                        className="form-label text-start d-block"
                      >
                        Official Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="officialEmail"
                        placeholder="Enter Official Email"
                        required
                      />
                    </div>

                    {/* Personal Email */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="personalEmail"
                        className="form-label text-start d-block"
                      >
                        Personal Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="personalEmail"
                        placeholder="Enter Personal Email"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="dob"
                        className="form-label text-start d-block"
                      >
                        Date of Birth
                      </label>
                      <input type="date" className="form-control" id="dob" />
                    </div>

                    {/* Gender */}
                    <div className="col-md-4 mb-4">
                      <label className="form-label text-start d-block">
                        Gender
                      </label>
                      <div className="d-flex align-items-center">
                        <div className="form-check me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                          />
                          <label className="form-check-label" htmlFor="male">
                            Male
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                          />
                          <label className="form-check-label" htmlFor="female">
                            Female
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Marital Status */}
                    <div className="col-md-4 mb-4">
                      <label className="form-label text-start d-block">
                        Marital Status
                      </label>
                      <select className="form-select" id="maritalStatus">
                        <option value="">Select Status</option>
                        <option value="married">Married</option>
                        <option value="unmarried">Unmarried</option>
                      </select>
                    </div>

                    {/* Joining Date */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="joiningDate"
                        className="form-label text-start d-block"
                      >
                        Joining Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="joiningDate"
                      />
                    </div>

                    {/* Overall Experience */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="experience"
                        className="form-label text-start d-block"
                      >
                        Overall Experience (Years)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="experience"
                        placeholder="Enter Experience in Years"
                      />
                    </div>

                    {/* Designation */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="designation"
                        className="form-label text-start d-block"
                      >
                        Designation
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="designation"
                        placeholder="Enter Designation"
                      />
                    </div>

                    {/* Reporting Manager */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="manager"
                        className="form-label text-start d-block"
                      >
                        Reporting Manager
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="manager"
                        placeholder="Enter Reporting Manager Name"
                      />
                    </div>

                    {/* Skills */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="skills"
                        className="form-label text-start d-block"
                      >
                        Skills
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="skills"
                        placeholder="Enter Skills"
                      />
                    </div>

                    {/* Certification & Resume */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="certification"
                        className="form-label text-start d-block"
                      >
                        Certification
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="certification"
                      />
                    </div>
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="Resume"
                        className="form-label text-start d-block"
                      >
                        Resume
                      </label>
                      <input type="file" className="form-control" id="Resume" />
                    </div>
                  </div>
                </div>
              )}

              {/* Portfolio Section */}
              {activeTab === 1 && (
                <div className="container mt-3 p-3 bg-white shadow-sm rounded">
                  <div className="row">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Education Level</th>
                          <th>College</th>
                          <th>Specialization</th>
                          <th>Passout Year</th>
                          <th>Percentage</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <Form.Select
                                name="educationLevel"
                                value={row.educationLevel}
                                onChange={(e) => handleChange(index, e)}
                                required
                              >
                                <option value="">Select Education</option>
                                <option value="SSC">SSC</option>
                                <option value="HSC">HSC</option>
                                <option value="UG">UG</option>
                                <option value="PG">PG</option>
                              </Form.Select>
                            </td>
                            <td>
                              <Form.Control
                                type="text"
                                name="college"
                                value={row.college}
                                placeholder="College"
                                onChange={(e) => handleChange(index, e)}
                                required
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="text"
                                name="specialization"
                                value={row.specialization}
                                placeholder="Specialization"
                                onChange={(e) => handleChange(index, e)}
                                required
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="number"
                                name="passoutYear"
                                value={row.passoutYear}
                                placeholder="Passout Year"
                                onChange={(e) => handleChange(index, e)}
                                required
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="number"
                                name="percentage"
                                value={row.percentage}
                                placeholder="Percentage"
                                onChange={(e) => handleChange(index, e)}
                                required
                              />
                            </td>
                            <td>
                              <Button
                                variant="danger"
                                onClick={() => deleteRow(index)}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className="col-md-12 mb-4 d-flex justify-content-end">
                      <Button variant="success" onClick={addRow}>
                        <FaPlus /> Add Row
                      </Button>
                      <Button
                        variant="primary"
                        onClick={submitData}
                        className="ms-2"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Project Section */}
              {activeTab === 2 && (
                <div className="container mt-3 p-3 bg-white shadow-sm rounded">
                  <form>
              <div className="row">
                <div className="col-md-6 mb-1">
                  <label
                    htmlFor="projectName"
                    className="form-label text-start d-block "
                  >
                   Project Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectName"
                    placeholder="Enter Project Name"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="projectNo"
                    className="form-label text-start d-block "
                  >
                     Project Number (PO No){" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectNo"
                    placeholder="Enter Project Number"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="projectManager"
                    className="form-label text-start d-block "
                  >
                     Project Manager <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectManager"
                    placeholder="Enter Project Manager Name"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="duration"
                    className="form-label text-start d-block "
                  >
                     Duration of Project{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="duration"
                    placeholder="Enter Project Duration"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="remark"
                    className="form-label text-start d-block "
                  >
                     Remark
                  </label>
                  <textarea
                    className="form-control"
                    id="remark"
                    rows="3"
                    placeholder="Add remarks..."
                  ></textarea>
                </div>

                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="status"
                    className="form-label text-start d-block "
                  >
                     Status <span className="text-danger">*</span>
                  </label>
                  <select className="form-select" id="status" required>
                    <option value="">Select Status</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                  </select>
                </div>
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
                  <div className="col-md-12 text-end">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpRegistrationFrom;
