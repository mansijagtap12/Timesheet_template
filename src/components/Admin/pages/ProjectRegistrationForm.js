import React, { useState } from "react";

const ProjectRegistrationForm = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    projectName: "",
    projectNo: "",
    projectManager: "",
    projectduration: "",
    remark: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      clientname: formData.clientName,
      projectname: formData.projectName,
      projectno: formData.projectNo,
      projectmanager: formData.projectManager,
      projectduration: formData.projectduration,
      remark: formData.remark,
      status: formData.status,
    };

    try {
      const response = await fetch(
        "https://vkrafthrportalbackend.onrender.com/api/projects/add_project",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Ensure the payload is converted to JSON
        }
      );

      // Check if response is JSON before parsing
      const contentType = response.headers.get("Content-Type");
      let result;
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = await response.text(); // Handle non-JSON response
        throw new Error(result);
      }

      setLoading(false);

      if (response.ok) {
        alert("Project registered successfully!");
        setFormData({
          projectName: "",
          clientName: "",
          projectNo: "",
          projectManager: "",
          projectduration: "",
          remark: "",
          status: "",
        });
      } else {
        throw new Error(result.message || "Failed to register project.");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      alert("Error: " + error.message);
    }
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
            <form onSubmit={handleSubmit}>
              <div className="row">
              <div className="col-md-6 mb-3">
                  <label htmlFor="projectName" className="form-label text-start d-block">
                    Client Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="clientName"
                    name="clientName"
                    placeholder="Enter client Name"
                    required
                    value={formData.clientName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="projectName" className="form-label text-start d-block">
                    Project Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectName"
                    name="projectName"
                    placeholder="Enter Project Name"
                    required
                    value={formData.projectName}
                    onChange={handleChange}
                  />
                </div>

             

                <div className="col-md-6 mb-3">
                  <label htmlFor="projectManager" className="form-label text-start d-block">
                    Project Manager <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectManager"
                    name="projectManager"
                    placeholder="1 or 2"
                    required
                    value={formData.projectManager}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="duration" className="form-label text-start d-block">
                    Duration of Project <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectduration"
                    name="projectduration"
                    placeholder="Enter Project Duration"
                    required
                    value={formData.projectduration}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="remark" className="form-label text-start d-block">
                    Remark
                  </label>
                  <textarea
                    className="form-control"
                    id="remark"
                    name="remark"
                    rows="1"
                    placeholder="Add remarks..."
                    value={formData.remark}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="status" className="form-label text-start d-block">
                    Status <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    required
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                  </select>
                </div>
              </div>

              {error && <p className="text-danger">{error}</p>}

              <div className="text-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
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
