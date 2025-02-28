import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Tab, Tabs } from "@mui/material";
import { Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EmpRegistrationFrom = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [employeeRegistered, setEmployeeRegistered] = useState(false);
  const [validated, setValidated] = useState(false);
  const [rowsEducation, setRowsEducation] = useState([
    {
      educationLevel: "",
      institution: "",
      degree: "",
      passoutYear: "",
      percentage: "",
    },
  ]);
  const [rowsExperience, setRowsExperience] = useState([
    {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
    },
  ]);
  const [formData, setFormData] = useState({
    work_location: "",
    firstname: "",
    middlename: "",
    lastname: "",
    phonenumber: "",
    email: "",
    personal_email: "",
    dateofbirth: "",
    gender: "",
    hiredate: "",
    skills: [],
    address: "",
    city: "",
    country: "",
    work_assignment_status: "",
    overall_experience: "",
    marital_status: "",
    employeeId: "",
  });
  const [projectData, setProjectData] = useState({
    position: "",
    client: "",
    status: "",
    poNumber: "",
    project: "",
  });

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const handleChange = (e, index = null, field = null, type = "basic") => {
    if (index !== null && field) {
      if (type === "education") {
        const updatedRows = [...rowsEducation];
        updatedRows[index][field] = e.target.value;
        setRowsEducation(updatedRows);
      } else if (type === "experience") {
        const updatedRows = [...rowsExperience];
        updatedRows[index][field] = e.target.value;
        setRowsExperience(updatedRows);
      }
    } else {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillsChange = (e) => {
    setFormData({
      ...formData,
      skills: e.target.value.split(",").map((skill) => skill.trim()),
    });
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const addRow = (type) => {
    if (type === "education") {
      setRowsEducation([
        ...rowsEducation,
        {
          educationLevel: "",
          institution: "",
          degree: "",
          passoutYear: "",
          percentage: "",
        },
      ]);
    } else if (type === "experience") {
      setRowsExperience([
        ...rowsExperience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          responsibilities: "",
        },
      ]);
    }
  };

  const deleteRow = (index, type) => {
    if (type === "education") {
      setRowsEducation(rowsEducation.filter((_, i) => i !== index));
    } else if (type === "experience") {
      setRowsExperience(rowsExperience.filter((_, i) => i !== index));
    }
  };

  const handleBasicNext = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      toast.error("Please fill all required fields correctly");
      return;
    }
    setValidated(false);
    setEmployeeRegistered(true);
    setActiveTab(1);
    toast.success("Basic details saved locally. Proceed to next tabs.");
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    // Validate education
    const invalidEducation = rowsEducation.some(
      (row) =>
        !row.educationLevel ||
        !row.institution ||
        !row.degree ||
        !row.passoutYear ||
        !row.percentage ||
        row.passoutYear < 1950 ||
        row.passoutYear > 2025 ||
        row.percentage < 0 ||
        row.percentage > 100
    );

    // Validate experience
    const invalidExperience = rowsExperience.some(
      (row) =>
        !row.company ||
        !row.position ||
        !row.startDate ||
        (row.endDate && row.startDate > row.endDate)
    );

    // Validate project
    const invalidProject =
      !projectData.client ||
      !projectData.project ||
      !projectData.position ||
      !projectData.status ||
      (projectData.status === "billable" && !projectData.poNumber);

    if (invalidEducation) {
      toast.error("Please complete all education details correctly");
      setActiveTab(1);
      return;
    }
    if (invalidProject) {
      toast.error("Please complete all project details correctly");
      setActiveTab(2);
      return;
    }
    if (invalidExperience) {
      toast.error("Please complete all experience details correctly");
      setActiveTab(3);
      return;
    }

    const payload = {
      user: formData.firstname,
      email: formData.email,
      password: "123",
      work_location: formData.work_location,
      firstName: formData.firstname,
      middlename: formData.middlename,
      lastname: formData.lastname,
      phonenumber: formData.phonenumber,
      dateofbirth: formData.dateofbirth || null,
      gender: formData.gender,
      hiredate: formData.hiredate || null,
      skills: formData.skills,
      address: formData.address,
      city: formData.city,
      work_assignment_status: formData.work_assignment_status,
      education: rowsEducation,
      project: projectData,
      previous_experience: rowsExperience,
      overall_experience: formData.overall_experience,
      marital_status: formData.marital_status,
    };

    try {
      const response = await axios.post(
        "https://vkrafthrportalbackend.onrender.com/api/users/add_user",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        toast.success("Employee registered successfully with all details!");
        setFormData({
          work_location: "",
          firstname: "",
          middlename: "",
          lastname: "",
          phonenumber: "",
          email: "",
          personal_email: "",
          dateofbirth: "",
          gender: "",
          hiredate: "",
          skills: [],
          address: "",
          city: "",
          country: "",
          work_assignment_status: "",
          overall_experience: "",
          marital_status: "",
          employeeId: "",
        });
        setRowsEducation([
          {
            educationLevel: "",
            institution: "",
            degree: "",
            passoutYear: "",
            percentage: "",
          },
        ]);
        setProjectData({
          position: "",
          client: "",
          status: "",
          poNumber: "",
          project: "",
        });
        setRowsExperience([
          {
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            responsibilities: "",
          },
        ]);
        setActiveTab(0);
        setEmployeeRegistered(false);
        setValidated(false);
      }
    } catch (err) {
      toast.error(
        "Error: " + (err.response?.data?.message || "API call failed")
      );
    }
  };

  const educationColumns = [
    {
      name: "Education Level",
      selector: (row, index) => (
        <Form.Select
          value={row.educationLevel}
          onChange={(e) =>
            handleChange(e, index, "educationLevel", "education")
          }
          required
          size="sm"
          isInvalid={validated && !row.educationLevel}
        >
          <option value="">Select Level</option>
          <option value="High School">High School (10th/SSC)</option>
          <option value="Senior Secondary">Senior Secondary (12th/HSC)</option>
          <option value="Bachelor's">Bachelor's Degree (UG)</option>
          <option value="Master's">Master's Degree (PG)</option>
          <option value="Diploma">Diploma</option>
          <option value="PhD">PhD</option>
          <option value="Certification">Certification</option>
        </Form.Select>
      ),
    },
    {
      name: "Institution",
      selector: (row, index) => (
        <Form.Control
          type="text"
          value={row.institution}
          placeholder="Institution Name"
          onChange={(e) => handleChange(e, index, "institution", "education")}
          required
          size="sm"
          minLength="2"
          isInvalid={validated && !row.institution}
        />
      ),
    },
    {
      name: "Degree/Certification",
      selector: (row, index) => (
        <Form.Control
          type="text"
          value={row.degree}
          placeholder="e.g., B.Tech, MBA"
          onChange={(e) => handleChange(e, index, "degree", "education")}
          required
          size="sm"
          minLength="2"
          isInvalid={validated && !row.degree}
        />
      ),
    },
    {
      name: "Passout Year",
      selector: (row, index) => (
        <Form.Control
          type="number"
          value={row.passoutYear}
          placeholder="YYYY"
          min="1950"
          max="2025"
          onChange={(e) => handleChange(e, index, "passoutYear", "education")}
          required
          size="sm"
          isInvalid={
            validated &&
            (!row.passoutYear ||
              row.passoutYear < 1950 ||
              row.passoutYear > 2025)
          }
        />
      ),
    },
    {
      name: "Percentage/GPA",
      selector: (row, index) => (
        <Form.Control
          type="number"
          value={row.percentage}
          placeholder="e.g., 85 or 3.8"
          min="0"
          max="100"
          step="0.1"
          onChange={(e) => handleChange(e, index, "percentage", "education")}
          required
          size="sm"
          isInvalid={
            validated &&
            (!row.percentage || row.percentage < 0 || row.percentage > 100)
          }
        />
      ),
    },
    {
      name: "Actions",
      selector: (row, index) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => deleteRow(index, "education")}
          className="rounded-circle"
        >
          <FaTrash />
        </Button>
      ),
      width: "80px",
    },
  ];

  const experienceColumns = [
    {
      name: "Company",
      selector: (row, index) => (
        <Form.Control
          type="text"
          value={row.company}
          placeholder="Company Name"
          onChange={(e) => handleChange(e, index, "company", "experience")}
          required
          size="sm"
          minLength="2"
          isInvalid={validated && !row.company}
        />
      ),
    },
    {
      name: "Position",
      selector: (row, index) => (
        <Form.Control
          type="text"
          value={row.position}
          placeholder="e.g., Software Engineer"
          onChange={(e) => handleChange(e, index, "position", "experience")}
          required
          size="sm"
          minLength="2"
          isInvalid={validated && !row.position}
        />
      ),
    },
    {
      name: "Start Date",
      selector: (row, index) => (
        <Form.Control
          type="date"
          value={row.startDate}
          onChange={(e) => handleChange(e, index, "startDate", "experience")}
          required
          size="sm"
          max={row.endDate || new Date().toISOString().split("T")[0]}
          isInvalid={validated && !row.startDate}
        />
      ),
    },
    {
      name: "End Date",
      selector: (row, index) => (
        <Form.Control
          type="date"
          value={row.endDate}
          onChange={(e) => handleChange(e, index, "endDate", "experience")}
          size="sm"
          min={row.startDate}
          isInvalid={validated && row.endDate && row.startDate > row.endDate}
        />
      ),
    },
    {
      name: "Responsibilities",
      selector: (row, index) => (
        <Form.Control
          type="text"
          value={row.responsibilities}
          placeholder="Key responsibilities"
          onChange={(e) =>
            handleChange(e, index, "responsibilities", "experience")
          }
          size="sm"
        />
      ),
    },
    {
      name: "Actions",
      selector: (row, index) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => deleteRow(index, "experience")}
          className="rounded-circle"
        >
          <FaTrash />
        </Button>
      ),
      width: "80px",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "rgb(218 217 240 / 57%)",
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#343a40",
      },
    },
    cells: { style: { padding: "8px" } },
  };

  return (
    <div className="container-fluid py-2 bg-light min-vh-100">
      <ToastContainer />
      <div
        className="card shadow-lg border-0 mx-auto"
        style={{ maxWidth: "1200px" }}
      >
        <div
          className="card-header text-black p-3"
          style={{ backgroundColor: "rgb(220 219 240 / 59%)" }}
        >
          <h5 className="mb-0">
            <i className="mdi mdi-pencil-box me-2"></i> Register Employee
          </h5>
        </div>
        <div className="card-body p-4">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            className="mb-4"
          >
            <Tab label="Employee Details" />
            <Tab label="Education" disabled={!employeeRegistered} />
            <Tab label="Project" disabled={!employeeRegistered} />
            <Tab label="Previous Experience" disabled={!employeeRegistered} />
          </Tabs>

          {activeTab === 0 && (
            <Form noValidate validated={validated} onSubmit={handleBasicNext}>
              <div className="row g-3">
                <div className="col-md-4">
                  <Form.Label>
                    Employee ID <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="Enter Employee ID (VKSS...)"
                    pattern="^VKSS.*"
                    required
                    minLength="5"
                    isInvalid={
                      validated &&
                      (!formData.employeeId ||
                        !/^VKSS/.test(formData.employeeId))
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid Employee ID starting with VKSS
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="work_location"
                    value={formData.work_location}
                    onChange={handleChange}
                    placeholder="Enter Location"
                    minLength="2"
                  />
                </div>
                <div className="col-md-4">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control type="file" accept="image/*" />
                </div>
                <div className="col-md-4">
                  <Form.Label>
                    First Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    required
                    minLength="2"
                    pattern="[A-Za-z]+"
                    isInvalid={
                      validated &&
                      (!formData.firstname ||
                        !/^[A-Za-z]+$/.test(formData.firstname))
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid first name (letters only)
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="middlename"
                    value={formData.middlename}
                    onChange={handleChange}
                    placeholder="Enter Middle Name"
                    pattern="[A-Za-z]*"
                  />
                </div>
                <div className="col-md-4">
                  <Form.Label>
                    Last Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    required
                    minLength="2"
                    pattern="[A-Za-z]+"
                    isInvalid={
                      validated &&
                      (!formData.lastname ||
                        !/^[A-Za-z]+$/.test(formData.lastname))
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid last name (letters only)
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <Form.Label>
                    Mobile Number <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                    pattern="[0-9]{10}"
                    required
                    isInvalid={
                      validated &&
                      (!formData.phonenumber ||
                        !/^[0-9]{10}$/.test(formData.phonenumber))
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid 10-digit phone number
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <Form.Label>
                    Official Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Official Email"
                    required
                    pattern="[a-z0-9._%+-]+@vkraftsoftware\.com"
                    isInvalid={
                      validated &&
                      (!formData.email ||
                        !/^[a-z0-9._%+-]+@vkraftsoftware\.com$/.test(
                          formData.email
                        ))
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid vkraftsoftware.com email address.
                  </Form.Control.Feedback>
                </div>

                <div className="col-md-4">
                  <Form.Label>
                    Personal Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="personal_email"
                    value={formData.personal_email}
                    onChange={handleChange}
                    placeholder="Enter Personal Email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
                    isInvalid={
                      validated &&
                      (!formData.personal_email ||
                        !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(
                          formData.personal_email
                        ))
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </div>

                <div className="col-md-4">
                  <Form.Label>
                    Date of Birth <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="dateofbirth"
                    value={formData.dateofbirth}
                    onChange={handleChange}
                    required
                    max={new Date().toISOString().split("T")[0]}
                    isInvalid={validated && !formData.dateofbirth}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid date of birth
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <Form.Label>Hire Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="hiredate"
                    value={formData.hiredate}
                    onChange={handleChange}
                    min={formData.dateofbirth}
                    isInvalid={
                      validated &&
                      formData.hiredate &&
                      formData.dateofbirth > formData.hiredate
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Hire date must be after date of birth
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <Form.Label>Skills</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.skills.join(", ")}
                    onChange={handleSkillsChange}
                    placeholder="Enter Skills (comma separated)"
                  />
                </div>
                <div className="col-md-6">
                  <Form.Label>
                    Address <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Address"
                    required
                    minLength="5"
                    isInvalid={
                      validated &&
                      (!formData.address || formData.address.length < 5)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid address (min 5 characters)
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-3">
                  <Form.Label>
                    City <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter City"
                    required
                    minLength="2"
                    pattern="[A-Za-z\s]+"
                    isInvalid={
                      validated &&
                      (!formData.city || !/^[A-Za-z\s]+$/.test(formData.city))
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid city name (letters only)
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter Country"
                    pattern="[A-Za-z\s]+"
                  />
                </div>
                <div className="col-md-4">
                  <Form.Label>Work Assignment Status</Form.Label>
                  <Form.Control
                    type="text"
                    name="work_assignment_status"
                    value={formData.work_assignment_status}
                    onChange={handleChange}
                    placeholder="Enter Work Status"
                  />
                </div>
                <div className="col-md-4">
                  <Form.Label>
                    Gender <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    isInvalid={validated && !formData.gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a gender
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <Form.Label>
                    Marital Status <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="marital_status"
                    value={formData.marital_status}
                    onChange={handleChange}
                    required
                    isInvalid={validated && !formData.marital_status}
                  >
                    <option value="">Select Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select marital status
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <Form.Label>
                    Overall Experience (Years){" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="overall_experience"
                    value={formData.overall_experience}
                    onChange={handleChange}
                    placeholder="Enter experience (e.g., 1.5)"
                    step="0.1"
                    min="0"
                    max="50"
                    required
                    isInvalid={
                      validated &&
                      (!formData.overall_experience ||
                        formData.overall_experience < 0)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter valid experience (0-50 years)
                  </Form.Control.Feedback>
                </div>
                <div className="col-12 text-end mt-2 mb-3">
                  <Button
                    type="submit"
                    variant="primary"
                    className="px-4 rounded-pill"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Form>
          )}

          {activeTab === 1 && (
            <Form noValidate validated={validated}>
              <DataTable
                columns={educationColumns}
                data={rowsEducation}
                customStyles={customStyles}
                highlightOnHover
                pointerOnHover
                noHeader
              />
              <div className="mt-3 text-end">
                <Button
                  variant="outline-success"
                  onClick={() => addRow("education")}
                  className="rounded-pill"
                >
                  <FaPlus className="me-2" /> Add Education
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setActiveTab(2)}
                  className="ms-2 rounded-pill"
                >
                  Next
                </Button>
              </div>
            </Form>
          )}

          {activeTab === 2 && (
            <Form noValidate validated={validated}>
              <div className="row g-3">
                <div className="col-md-6">
                  <Form.Label>
                    Client <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="client"
                    value={projectData.client}
                    onChange={handleProjectChange}
                    required
                    isInvalid={validated && !projectData.client}
                  >
                    <option value="">Select Client</option>
                    <option value="Client A">Client A</option>
                    <option value="Client B">Client B</option>
                    <option value="Client C">Client C</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a client
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-6">
                  <Form.Label>
                    Project <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="project"
                    value={projectData.project}
                    onChange={handleProjectChange}
                    required
                    isInvalid={validated && !projectData.project}
                  >
                    <option value="">Select Project</option>
                    <option value="AIA">AIA</option>
                    <option value="Amway">Amway</option>
                    <option value="Pepco">Pepco</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a project
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-6">
                  <Form.Label>
                    Position <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="position"
                    value={projectData.position}
                    onChange={handleProjectChange}
                    required
                    isInvalid={validated && !projectData.position}
                  >
                    <option value="">Select Position</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Sr Developer">Sr Developer</option>
                    <option value="Jr Developer">Jr Developer</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a position
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-6">
                  <Form.Label>
                    Status <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="status"
                    value={projectData.status}
                    onChange={handleProjectChange}
                    required
                    isInvalid={validated && !projectData.status}
                  >
                    <option value="">Select Status</option>
                    <option value="billable">Billable</option>
                    <option value="non-billable">Non-Billable</option>
                    <option value="backup">Backup</option>
                    <option value="bench">Bench</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a status
                  </Form.Control.Feedback>
                </div>
                {projectData.status === "billable" && (
                  <div className="col-md-6">
                    <Form.Label>
                      PO Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="poNumber"
                      value={projectData.poNumber}
                      onChange={handleProjectChange}
                      placeholder="Enter PO Number"
                      required
                      minLength="2"
                      isInvalid={validated && !projectData.poNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid PO Number
                    </Form.Control.Feedback>
                  </div>
                )}
                <div className="col-12 text-end mt-2">
                  <Button
                    variant="primary"
                    onClick={() => setActiveTab(3)}
                    className="px-4 rounded-pill"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Form>
          )}

          {activeTab === 3 && (
            <Form noValidate validated={validated}>
              <DataTable
                columns={experienceColumns}
                data={rowsExperience}
                customStyles={customStyles}
                highlightOnHover
                pointerOnHover
                noHeader
              />
              <div className="mt-3 text-end">
                <Button
                  variant="outline-success"
                  onClick={() => addRow("experience")}
                  className="rounded-pill"
                >
                  <FaPlus className="me-2" /> Add Experience
                </Button>
                <Button
                  variant="primary"
                  onClick={(e) => {
                    setValidated(true);
                    handleFinalSubmit(e);
                  }}
                  className="ms-2 rounded-pill"
                >
                  Register Employee
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpRegistrationFrom;
