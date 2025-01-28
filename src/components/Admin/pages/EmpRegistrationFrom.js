import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from 'react-select';

const EmpRegistrationFrom = () => {
  const [activeSection, setActiveSection] = useState("personalInfo"); // Manage active section

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Employee registered successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCertification, setselectedCertification] = useState([]);

  const options = [
    { value: 'Webmethod', label: 'Webmethod' },
    { value: 'HTML', label: 'HTML' },
    { value: 'Java', label: 'Java' },
    { value: 'CamelK', label: 'CamelK' },
  ];
  const Certifications = [
    { value: 'Webmethod', label: 'Software AG Certified web Methods Integration Associate' },
    { value: 'HTML', label: 'Flask Python' },
    { value: 'Java', label: 'SQL' },
    { value: 'CamelK', label: 'CamelK' },
  ];

  const handleChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
  };
  const handleChangeCertifications = (selectedOptionsCertification) => {
    setselectedCertification(selectedOptionsCertification);
  };
  return (
    <div className="content-wrapper">
      <ToastContainer />
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div className="page-header">
              <h5 className="page-title">
                <span className="page-title-icon  text-dark me-2">
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

            <form className="form-sample" onSubmit={handleSubmit}>
              {/* Personal Info Section */}
              <div
                className="container mt-1"
                style={{
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  padding: "10px",
                  background: "#fff",
                }}
              >
                <div
                  className="d-flex justify-content-between align-items-center mb-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleSection("personalInfo")}
                >
                  <b className="card-description mb-0 fs-6">PERSONAL INFO</b>
                  <i
                    className={`mdi ${
                      activeSection === "personalInfo"
                        ? "mdi-chevron-up"
                        : "mdi-chevron-down"
                    }`}
                  ></i>
                </div>

                {activeSection === "personalInfo" && (
                  <div className="row">
                    {/* Full Name */}
                    <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          placeholder="Enter Full Name"
                          required
                        />
                        <label htmlFor="fullName">
                          <span role="img" aria-label="User">
                            👤
                          </span>{" "}
                          Full Name<span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>

                    {/* Username */}
                    <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Email"
                          required
                        />
                        <label htmlFor="username">
                          <span role="img" aria-label="Username">
                            @
                          </span>{" "}
                          Email<span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="phone"
                          placeholder="Phone"
                        />
                        <label htmlFor="phone">
                          <span role="img" aria-label="Phone">
                            📞
                          </span>{" "}
                          Phone
                        </label>
                      </div>
                    </div>

                    {/* Gender Radio Buttons */}
                    <div className="col-md-6 mb-0">
                      <label
                        className="form-label"
                        style={{
                          paddingRight: "310px",
                          marginBottom: "0px",
                        }}
                      >
                        <span role="img" aria-label="Gender">
                          👦
                        </span>{" "}
                        Gender
                      </label>
                      <div
                        className="d-flex align-items-center"
                        style={{ paddingLeft: "33px" }}
                      >
                        <div className="form-check me-5">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            style={{
                              borderRadius: "50%",
                              borderColor: "#007bff",
                            }}
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
                            style={{
                              borderRadius: "50%",
                              borderColor: "#007bff",
                            }}
                          />
                          <label className="form-check-label" htmlFor="female">
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Portfolio Section */}
              <div
                className="container mt-1"
                style={{
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  padding: "20px",
                  background: "#fff",
                }}
              >
                <div
                  className="d-flex justify-content-between align-items-center mb-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleSection("portfolio")}
                >
                  <b className="card-description mb-0 fs-6">PORTFOLIO</b>
                  <i
                    className={`mdi ${
                      activeSection === "portfolio"
                        ? "mdi-chevron-up"
                        : "mdi-chevron-down"
                    }`}
                  ></i>
                </div>

                {activeSection === "portfolio" && (
                  <div className="row">
                    {/* Work Location */}
                    <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="workLocation"
                          placeholder="Work Location"
                          required
                        />
                        <label htmlFor="workLocation">
                          <span role="img" aria-label="Location">
                            📍
                          </span>{" "}
                          Work Location<span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    {/* Project */}
                    <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="project"
                          placeholder="Project"
                        />
                        <label htmlFor="project">Project</label>
                      </div>
                    </div>

                    {/* Reporting Manager */}
                    <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="manager"
                          placeholder="Reporting Manager"
                          required
                        />
                        <label htmlFor="manager">
                          Reporting Manager{" "}
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="duration"
                          placeholder="Duration"
                        />
                        <label htmlFor="duration">Duration</label>
                      </div>
                    </div>

                   
                    <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="file"
                          className="form-control"
                          id="duration"
                          placeholder="Duration"
                        />
                        <label htmlFor="Upload_Resume">Upload Resume</label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="file"
                          className="form-control"
                          id="duration"
                          placeholder="Duration"
                        />
                        <label htmlFor="Upload_Certifications">
                          Upload Certifications
                        </label>
                      </div>
                    </div>
                     {/* Skills */}
                     <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <Select
                          isMulti
                          options={options}
                          value={selectedSkills}
                          onChange={handleChange}
                          placeholder="Select Skills"
                        />
                       
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <Select
                          isMulti
                          options={Certifications}
                          value={selectedCertification}
                          onChange={handleChangeCertifications}
                          placeholder="Select Certifications"
                        />
                       
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="row mt-3">
                <div className="col-md-12 mb-3 d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpRegistrationFrom;
