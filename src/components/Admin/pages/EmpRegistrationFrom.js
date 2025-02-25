import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { Tab, Tabs } from "@mui/material";
import { Table, Button, Form } from "react-bootstrap";

import { FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const EmpRegistrationFrom = () => {
  const [activeSection, setActiveSection] = useState("personalInfo"); // Manage active section
  const [rows, setRows] = useState([{}]);

  const [position, setPosition] = useState("");
    const [client, setClient] = useState("");
    const [status, setStatus] = useState("");
    const [poNumber, setPoNumber] = useState("");
      const [project, setProject] = useState("");
  // const navigate = useNavigate();
  const addRow = () => setRows([...rows, {}]);
  const deleteRow = (index) => setRows(rows.filter((_, i) => i !== index));
  const [formData, setFormData] = useState({
    work_location: "",
    firstname: "",
    middlename: "",
    lastname: "",
    phonenumber: "",
    email: "",
    dateofbirth: "",
    gender: "",
    hiredate: "",
    skills: [],
    address: "",
    city: "",
    work_assignment_status: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const payload = {
      user: formData.firstName, // user is set to firstName
      email: formData.email, // email input
      password: "123", // Static password
      work_location: formData.work_location,
      firstName: formData.firstName,
      city: formData.city,
      address: formData.address,
      lastname: formData.lastname,
      middlename: formData.middlename,
      phonenumber: formData.phonenumber,
      email: formData.email,
      dateofbirth: formData.dateofbirth || null,
      gender: formData.gender,
      hiredate: formData.hiredate || null,
      skills: formData.skills,
      work_assignment_status: formData.work_assignment_status,
    };
    try {
      const response = await axios.post(
        "https://vkrafthrportalbackend.onrender.com/api/users/add_user",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setMessage("Employee registered successfully!");
        toast.success("Employee registered successfully!");
        // navigate("/employee-list");
      } else {
        setError("Something went wrong. Please try again.");
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Error: " + (err.response?.data?.message || "API call failed"));
      toast.error(
        "Error: " + (err.response?.data?.message || "API call failed")
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSkillsChange = (e) => {
    setFormData({
      ...formData,
      skills: e.target.value.split(",").map((skill) => skill.trim()), // Split by comma and remove extra spaces
    });
  };

  const handleGenderChange = (e) => {
    setFormData({
      ...formData,
      gender: e.target.value,
    });
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
                        pattern="^VKSS.*"
                        title="Employee ID must start with VKSS"
                        required
                      />
                    </div>

                    {/* Location */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="work_location"
                        className="form-label text-start d-block"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="work_location"
                        name="work_location"
                        value={formData.work_location}
                        onChange={handleChange}
                        placeholder="Enter Location"
                        required
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
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter First Name"
                        required
                      />
                    </div>
                    {/* Middle Name */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="middlename"
                        className="form-label text-start d-block"
                      >
                        Middle Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="middlename"
                        name="middlename"
                        value={formData.middlename}
                        onChange={handleChange}
                        placeholder="Enter Middle Name"
                        required
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
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Enter Last Name"
                        required
                      />
                    </div>

                    {/* Mobile Number */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="phonenumber"
                        className="form-label text-start d-block"
                      >
                        Mobile Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phonenumber"
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleChange}
                        placeholder="Enter Mobile Number"
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="work_assignment_status"
                        className="form-label text-start d-block"
                      >
                        Project <span className="text-danger">*</span>
                      </label>
                      <input
                        type="work_assignment_status"
                        className="form-control"
                        id="work_assignment_status"
                        name="work_assignment_status"
                        value={formData.work_assignment_status}
                        onChange={handleChange}
                        placeholder="Enter project Name"
                        required
                      />
                    </div>
                    {/* Official Email */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="email"
                        className="form-label text-start d-block"
                      >
                        Official Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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
                        id="email"
                        placeholder="Enter Personal Email"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="dateofbirth"
                        className="form-label text-start d-block"
                      >
                        {" "}
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateofbirth"
                        name="dateofbirth"
                        value={formData.dateofbirth}
                        onChange={handleChange}
                      />
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
                            id="genderMale"
                            value="male"
                            onChange={handleGenderChange}
                            checked={formData.gender === "male"}
                          />{" "}
                          <label
                            className="form-check-label"
                            htmlFor="genderMale"
                          >
                            {" "}
                            Male
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="genderFemale"
                            value="female"
                            onChange={handleGenderChange}
                            checked={formData.gender === "female"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="genderFemale"
                          >
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
                        htmlFor="address"
                        className="form-label text-start d-block"
                      >
                        {" "}
                        Designation <span className="text-danger">*</span>
                      </label>
                      <input
                        type="address"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter Designation"
                        required
                      />
                    </div>

                    {/* Reporting Manager */}
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="city"
                        className="form-label text-start d-block"
                      >
                        Reporting Manger <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter Reporting Manager Name"
                        required
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
                        name="skills"
                        value={formData.skills.join(", ")} // Show skills as a comma-separated string
                        onChange={handleSkillsChange}
                        placeholder="Enter Skills (comma separated)"
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
                        {" "}
                        Resume
                      </label>
                      <input type="file" className="form-control" id="Resume" />
                    </div>
                  </div>
                  <Button
                    className="mt-3"
                    variant="primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
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
                        {rows.map((row, e) => (
                          <tr key={e}>
                            <td>
                              <Form.Select
                                name="educationLevel"
                                value={row.educationLevel}
                                onChange={(e) => handleChange(e)}
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
                                onChange={(e) => handleChange(e)}
                                required
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="text"
                                name="specialization"
                                value={row.specialization}
                                placeholder="Specialization"
                                onChange={(e) => handleChange(e)}
                                required
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="number"
                                name="passoutYear"
                                value={row.passoutYear}
                                placeholder="Passout Year"
                                onChange={(e) => handleChange(e)}
                                required
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="number"
                                name="percentage"
                                value={row.percentage}
                                placeholder="Percentage"
                                onChange={(e) => handleChange(e)}
                                required
                              />
                            </td>
                            <td>
                              <Button
                                variant="danger"
                                onClick={() => deleteRow(e)}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className="col-md-12 mb-4 d-flex justify-content-end">
                      <Button
                        variant="btn btn-outline-success"
                        onClick={addRow}
                      >
                        <FaPlus /> Add Row
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
                {/* Client Dropdown */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="client" className="form-label">
                    Select Client <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="client"
                    required
                    onChange={(e) => setClient(e.target.value)}
                  >
                    <option value="">Select Client</option>
                    <option value="Client A">Client A</option>
                    <option value="Client B">Client B</option>
                    <option value="Client C">Client C</option>
                  </select>
                </div>

                {/* Project Dropdown */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="project" className="form-label">
                    Select Project <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="project"
                    required
                    onChange={(e) => setProject(e.target.value)}
                  >
                    <option value="">Select Project</option>
                    <option value="AIA">AIA</option>
                    <option value="Amway">Amway</option>
                    <option value="Pepco">Pepco</option>
                  </select>
                </div>

                {/* Position Dropdown */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="position" className="form-label">
                    Position <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="position"
                    required
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value="">Select Position</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Sr Developer">Sr Developer</option>
                    <option value="Jr Developer">Jr Developer</option>
                  </select>
                </div>

                {/* Employee Status Dropdown */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="status" className="form-label">
                    Status of Employee <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="status"
                    required
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="billable">Billable</option>
                    <option value="non-billable">Non-Billable</option>
                    <option value="backup">Backup</option>
                    <option value="bench">Bench</option>
                  </select>
                </div>

                {/* PO Number Field (Shown only if Billable) */}
                {status === "billable" && (
                  <div className="col-md-6 mb-3">
                    <label htmlFor="ponumber" className="form-label">
                      PO Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ponumber"
                      name="ponumber"
                      placeholder="Enter PO Number"
                      required={status === "billable"}
                      onChange={(e) => setPoNumber(e.target.value)}
                    />
                  </div>
                )}
              </div>
                  </form>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpRegistrationFrom;
