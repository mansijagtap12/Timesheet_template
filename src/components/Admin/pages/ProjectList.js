import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa"; // FontAwesome icons for Edit and Trash
import Modal from "react-bootstrap/Modal"; // Bootstrap Modal
import Button from "react-bootstrap/Button";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";
import axios from "axios";

const ProjectList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const [showSearch, setShowSearch] = useState(false);
  // Sample Project data
  const [Projects, setProjects] = useState([]);
  const [originalProjects, setOriginalProjects] = useState(Projects);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://vkrafthrportalbackend.onrender.com/api/projects/get_all_projects"
        );
        const jsonData = await response.json();

        if (jsonData.data && Array.isArray(jsonData.data)) {
          setProjects(jsonData.data);
          setOriginalProjects(jsonData.data); // Save original data once
        } else {
          console.error("Invalid API response format:", jsonData);
          setProjects([]);
          setOriginalProjects([]);
        }
      } catch (error) {
        console.error("Error fetching Projects:", error);
      }
    };

    fetchProjects();
  }, []); // No dependency on Projects here

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Handle Edit action
  const handleEdit = (Project) => {
    setCurrentProject(Project); // Set the current Project to edit
    setShowModal(true); // Show the modal
  };
  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setProjects(originalProjects); // Reset to original data when input is empty
    } else {
      const filteredProjects = originalProjects.filter((Project) =>
        Object.values(Project).some((value) =>
          String(value).toLowerCase().includes(term)
        )
      );
      setProjects(filteredProjects); // Filtered data when there is input
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Projct?")) {
      try {
        await axios.delete(
          `https://vkrafthrportalbackend.onrender.com/api/projects/delete_project/${id}`
        );

        // Remove Project from the list after successful deletion
        setProjects((prevProjects) =>
          prevProjects.filter((emp) => emp.id !== id)
        );

        toast.success("Project deleted successfully!");
      } catch (error) {
        console.error("Error deleting Project:", error);
        toast.error("Failed to delete Project!");
      }
    }
  };

  // Handle Save Changes in Modal
  const handleSave = () => {
    const updatedProjects = Projects.map((emp) =>
      emp.id === currentProject.id ? { ...emp, ...currentProject } : emp
    );
    setProjects(updatedProjects); // Update Project list
    setShowModal(false); // Close the modal
    toast.success("Data updated successfully!"); // Show success toast
  };

  // Handle input change in Modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject((prevState) => ({
      ...prevState,
      [name]: name === "skills" ? value.split(",") : value, // Split skills by comma
    }));
  };

  const columns = [
    {
      name: "Client Name",
      selector: (row) => row.clientname,
      sortable: true,
    },
    {
      name: "Project Name",
      selector: (row) => row.projectname,
      sortable: true,
    },
    {
      name: "Project Manager",
      selector: (row) => row.projectmanager,
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row.projectduration,
      sortable: false,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "View",
      cell: (row) => (
        <div>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>View Employee</Tooltip>}
          >
            <button
              className="btn btn-outline-info btn-sm me-2"
              onClick={() => handleEdit(row)}
            >
              <FaEye />
            </button>
          </OverlayTrigger>
        </div>
      ),
    },

    {
      name: "Actions",
      cell: (row) => (
        <div>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Edit Project</Tooltip>}
          >
            <button
              className="btn btn-outline-success btn-sm me-2"
              onClick={() => handleEdit(row)}
            >
              <FaEdit />
            </button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Delete Project</Tooltip>}
          >
            <button
              className="btn btn-outline-danger btn-sm me-2"
              onClick={() => handleDelete(row.id)}
            >
              <FaTrash />
            </button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="d-flex justify-content-end" style={{ padding: "0px" }}>
        {/* Search Icon */}
        <i
          className="mdi mdi-magnify"
          style={{
            cursor: "pointer",
            fontSize: "20px",
            padding: "5px",
            marginLeft: "100px",
            marginTop: " -32px",
            color: "blue",
          }}
          onClick={() => setShowSearch(!showSearch)} // Toggle search box visibility
          title="Search"
        />

        {/* Search Input Box */}
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              padding: "5px",
              marginBottom: "10px",
              width: "30%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginLeft: "10px",
              marginTop: " -32px",
            }}
          />
        )}
      </div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="page-header">
              <h5 className="page-title">
                <span className="page-title-icon  text-dark me-2">
                  <i className="mdi mdi-pencil-box"></i>
                </span>
                Project`s Record
              </h5>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/ProjectRegistrationForm">Register Project</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Project Record
                  </li>
                </ol>
              </nav>
            </div>
            <hr />
            <div>
              {/* Add ToastContainer */}
              <ToastContainer position="top-right" autoClose={3000} />
              {/* Your App Components */}
            </div>

            <DataTable
              columns={columns}
              data={Projects}
              pagination
              highlightOnHover
              striped
              fixedHeader
              fixedHeaderScrollHeight="400px"
              customStyles={{
                table: {
                  style: {
                    border: "1px solid #ccc",
                  },
                },
                headRow: {
                  style: {
                    borderBottom: "1px solid #ccc",
                  },
                },
                rows: {
                  style: {
                    borderBottom: "1px solid #eee",
                  },
                },
                columns: {
                  style: {
                    borderBottom: "1px solid #eee",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      {/* Modal for editing Project details */}
      {currentProject && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Client Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="projectname"
                      value={currentProject.clientnametname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Project Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="projectname"
                      value={currentProject.projectname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Project Manager</label>
                    <input
                      type="text"
                      className="form-control"
                      name="rm"
                      value={currentProject.projectmanager}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Project Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      name="projectduration"
                      value={currentProject.projectduration}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-12">

                  <div className="form-group">
                    <label>Status</label>
                    <select
                    className="form-select"
                    id="status"
                    name="status"
                    required
                    value={currentProject.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                  </select>
                    
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
export default ProjectList;
