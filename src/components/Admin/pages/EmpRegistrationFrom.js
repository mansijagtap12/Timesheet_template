import React, { useState } from "react";

const EmpRegistrationFrom = () => {
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [showPortfolio, setShowPortfolio] = useState(false);

  const togglePersonalInfo = () => {
    setShowPersonalInfo(!showPersonalInfo);
  };

  const togglePortfolio = () => {
    setShowPortfolio(!showPortfolio);
  };

  return (
    <div className="content-wrapper">
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div className="page-header">
              <h5 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="mdi mdi-format-align-justify"></i>
                </span>
                Register Employee
              </h5>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
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

            <form className="form-sample">
              {/* Personal Info Section */}
              <div className="container mt-5">
                <div
                  className="d-flex justify-content-between align-items-center mb-3"
                  style={{ cursor: "pointer" }}
                  onClick={togglePersonalInfo}
                >
                  <h6 className="card-description mb-0 fs-5">Personal Info</h6>
                  <i
                    className={`mdi ${
                      showPersonalInfo ? "mdi-chevron-up" : "mdi-chevron-down"
                    }`}
                  ></i>
                </div>

                {showPersonalInfo && (
                  <div className="row">
                    {/* Full Name */}
                    <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          placeholder="Enter Full Name"
                        />
                        <label htmlFor="fullName">
                          <span role="img" aria-label="User">
                            👤
                          </span>{" "}
                          Full Name
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
                        />
                        <label htmlFor="username">
                          <span role="img" aria-label="Username">
                            @
                          </span>{" "}
                          Username
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
  <label className="form-label" style={{paddingRight:"310px",    marginBottom: "0px"}}>
    <span role="img" aria-label="Gender">👦</span> Gender
  </label>
  <div className="d-flex align-items-center" style={{paddingLeft:"33px"}}>
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
              <div className="container mt-5">
                <div
                  className="d-flex justify-content-between align-items-center mb-3"
                  style={{ cursor: "pointer" }}
                  onClick={togglePortfolio}
                >
                  <h6 className="card-description mb-0 fs-5">Portfolio</h6>
                  <i
                    className={`mdi ${
                      showPortfolio ? "mdi-chevron-up" : "mdi-chevron-down"
                    }`}
                  ></i>
                </div>

                {showPortfolio && (
                  <div className="row">
                     {/* Work Location */}
                     <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="workLocation"
                          placeholder="Work Location"
                        />
                        <label htmlFor="workLocation">
                          <span role="img" aria-label="Location">
                            📍
                          </span>{" "}
                          Work Location
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
                        />
                        <label htmlFor="manager">Reporting Manager</label>
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

                    {/* Skills */}
                    <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <select className="form-select" id="Skills">
                        <option value="Webmethod">Webmethod</option>
                          <option value="HTML">HTML</option>
                          <option value="Java">Java</option>
                          <option value="CamelK">CamelK</option>
                        </select>
                        <label htmlFor="Skills">Skills</label>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="col-md-6 mb-3">
                      <div className="form-floating ">
                        <select className="form-select " id="Certifications"> 
                          <option value="Webmethod">Webmethod</option>
                          <option value="HTML">HTML</option>
                          <option value="Java">Java</option>
                          <option value="CamelK">CamelK</option>
                        </select>
                        <label htmlFor="Certifications">Certifications</label>
                      </div>
                    </div>
                    {/* Certifications */}
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
                        <label htmlFor="Upload_Certifications">Upload Certifications</label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="row">
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
