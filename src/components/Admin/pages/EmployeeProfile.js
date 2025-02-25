import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://vkrafthrportalbackend.onrender.com/api/users/get_by_id/${id}`
        );
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee details:", error);
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!employee) {
    return <div className="text-center mt-5">Employee not found.</div>;
  }

  return (
    <div
      className="container-fluid py-4"
      style={{ background: "#f4f6f9", minHeight: "100vh" }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-11 bg-white shadow-lg rounded p-4">
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/employee-list")} // Go back to the previous page
            >
              ← Back
            </button>
          </div>

          <div className="row">
            {/* Left Section - Profile & Basic Info */}
            <div className="col-md-4 text-center border-end">
              <div className="profile-card p-3 shadow-lg rounded bg-white">
                {/* Profile Image */}
                <div className="d-flex justify-content-center">
                  <img
                    src={
                      employee.image || "/assets/images/faces-clipart/pic-2.png"
                    }
                    alt="Profile"
                    className="rounded-circle shadow-sm border border-3 border-primary"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Employee Name & ID */}
                <h5 className="fw-bold mt-3 text-primary">
                  {employee.firstname} {employee.lastname}
                </h5>
                <p className="text-muted mb-1">
                  Employee ID:{" "}
                  <span className="fw-semibold">{employee.emp_id}</span>
                </p>
                <p className="text-muted">{employee.designation}</p>

                {/* Status Badge */}
                <span
                  className={`badge ${
                    employee.account_status === "Active"
                      ? "bg-success"
                      : "bg-danger"
                  } px-3 py-2`}
                >
                  {employee.account_status}
                </span>

                {/* Contact Information */}
                <div className="mt-4 text-start px-3">
                  <h6 className="fw-bold text-dark">Contact Information</h6>
                  <p className="mb-1">
                    <i className="mdi mdi-email-outline text-primary"></i>{" "}
                    <span className="fw-semibold">{employee.email}</span>
                  </p>
                  <p>
                    <i className="mdi mdi-phone text-success"></i>{" "}
                    <span className="fw-semibold">{employee.phonenumber}</span>
                  </p>
                  <p>
                    <i className="mdi mdi-calendar text-warning"></i> Date of
                    Birth:{" "}
                    <span className="fw-semibold">{employee.dateofbirth}</span>
                  </p>
                </div>

                {/* Address Section */}
                <div className="mt-3 text-start px-3">
                  <h6 className="fw-bold text-dark">Address</h6>
                  <p className="bg-light p-2 rounded shadow-sm">
                    {employee.address}, {employee.city}, {employee.state},{" "}
                    {employee.country} - {employee.zipcode}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - Employee Details */}
            <div className="col-md-8">
              <div className="px-4 py-3">
                {/* Personal Information */}
                <div className="card shadow-sm border-0 mb-1">
                  <div className="card-header bg-light border-primary text-black rounded-top">
                    <h6 className="fw-bold mb-0">Personal Details</h6>
                  </div>
                  <div className="card-body bg-white rounded-bottom">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="d-flex justify-content-between border-bottom py-2">
                          <strong className="text-muted">Job Title:</strong>
                          <span>{employee.jobtitle}</span>
                        </div>
                        <div className="d-flex justify-content-between border-bottom py-2">
                          <strong className="text-muted">Hire Date:</strong>
                          <span>{employee.hiredate}</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex justify-content-between border-bottom py-2">
                          <strong className="text-muted">Experience:</strong>
                          <span>{employee.overall_experiance} years</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="card shadow-sm border-0 mb-1">
                  <div className="card-header bg-light border-success text-black rounded-top">
                    <h6 className="fw-bold mb-0">Project Details</h6>
                  </div>
                  <div className="card-body bg-white rounded-bottom">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="d-flex justify-content-between border-bottom py-2">
                          <strong className="text-muted">Client Name:</strong>
                          <span>AIA</span>
                        </div>
                        <div className="d-flex justify-content-between border-bottom py-2">
                          <strong className="text-muted">
                            Project Manager:
                          </strong>
                          <span>Vishnu</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex justify-content-between border-bottom py-2">
                          <strong className="text-muted">Project Name:</strong>
                          <span>{employee.work_assignment_status}</span>
                        </div>
                        <div className="d-flex justify-content-between border-bottom py-2">
                          <strong className="text-muted">
                            Employee Status:
                          </strong>
                          <span className="badge bg-info text-dark">
                            Billable
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="card shadow-sm border-0 mb-1">
                  <div className="card-header bg-light border-info text-black rounded-top">
                    <h6 className="fw-bold mb-0">Skills</h6>
                  </div>
                  <div className="card-body bg-white rounded-bottom">
                    <div className="d-flex flex-wrap gap-2">
                      {employee.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="badge bg-primary px-3 py-2 fw-normal animate__animated animate__fadeIn"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div className="card shadow-sm border-0 mb-1">
                  <div className="card-header bg-light border-success text-black rounded-top">
                    <h6 className="fw-bold mb-0">Education</h6>
                  </div>
                  <div className="card-body bg-white rounded-bottom">
                    <div className="row g-3">
                      {employee.education.map((edu, index) => (
                        <div key={index} className="col-md-6">
                          <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-3 transition-all hover-shadow">
                            <h6 className="fw-bold text-dark mb-1">
                              {edu.degree}
                            </h6>
                            <p className="mb-1 text-muted">{edu.university}</p>
                            <p className="text-secondary small">
                              Year: {edu.year}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
