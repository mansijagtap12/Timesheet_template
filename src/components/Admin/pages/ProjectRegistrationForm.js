import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";

const ProjectRegistrationForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectNo: "",
    projectManager: "",
    duration: "",
    remark: "",
    status: "",
    position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add API call or form submission logic here
  };

  return (
    <div className="content-wrapper">
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div className="page-header">
              <h5 className="page-title">
                <span className="page-title-icon text-dark me-2">
                  <i className="mdi mdi-pencil-box"></i>
                </span>
                Register Project
                <hr />
              </h5>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/Project-List">Project List</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Register Project
                  </li>
                </ol>
              </nav>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectRegistrationForm;
