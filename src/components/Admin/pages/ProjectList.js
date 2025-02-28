import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Removed FaEye (not used in current logic)
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Form, Row, Col } from "react-bootstrap"; // Added Form, Row, Col for modal layout
import "bootstrap/dist/css/bootstrap.min.css";

const ProjectList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [showSearch, setShowSearch] = useState(false);
  const [projects, setProjects] = useState([]);
  const [originalProjects, setOriginalProjects] = useState([]);
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
  const handleEdit = (project) => {
    setCurrentProject(project); // Set the current project to edit
    setShowModal(true); // Show the modal
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setProjects(originalProjects); // Reset to original data when input is empty
    } else {
      const filteredProjects = originalProjects.filter((project) =>
        Object.values(project).some((value) =>
          String(value).toLowerCase().includes(term)
        )
      );
      setProjects(filteredProjects); // Filtered data when there is input
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Project?")) {
      try {
        await axios.delete(
          `https://vkrafthrportalbackend.onrender.com/api/projects/delete_project/${id}`
        );

        // Remove project from the list after successful deletion
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
    const updatedProjects = projects.map((emp) =>
      emp.id === currentProject.id ? { ...emp, ...currentProject } : emp
    );
    setProjects(updatedProjects); // Update project list
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
      cell: (row) => <span className="text-dark fw-semibold">{row.clientname}</span>,
    },
    {
      name: "Project Name",
      selector: (row) => row.projectname,
      sortable: true,
      cell: (row) => <span className="text-dark">{row.projectname}</span>,
    },
    {
      name: "Project Manager",
      selector: (row) => row.projectmanager,
      sortable: true,
      cell: (row) => <span className="text-muted">{row.projectmanager || "N/A"}</span>,
    },
    {
      name: "Duration",
      selector: (row) => row.projectduration,
      sortable: false,
      cell: (row) => <span className="text-muted">{row.projectduration || "N/A"}</span>,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => {
        let badgeClass = "bg-secondary"; // Default color
    
        switch (row.status) {
          case "In progress":
            badgeClass = "bg-warning"; // Blue
            break;
          case "completed":
            badgeClass = "bg-success"; // Green
            break;
          case "on-hold":
            badgeClass = "bg-danger"; // Red
            break;
          case "pending":
            badgeClass = "bg-warning"; // Yellow
            break;
          case "canceled":
            badgeClass = "bg-dark"; // Dark grey
            break;
          default:
            badgeClass = "bg-secondary"; // Default gray
        }
    
        return (
          <span className={`badge ${badgeClass} text-white px-3 py-1`}>
            {row.status || "N/A"}
          </span>
        );
      },
    },
    
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit Project</Tooltip>}>
            <Button
              variant="outline-success"
              size="sm"
              className="rounded-circle shadow-sm"
              onClick={() => handleEdit(row)}
            >
              <FaEdit />
            </Button>
          </OverlayTrigger>
          {/* <OverlayTrigger placement="top" overlay={<Tooltip>Delete Project</Tooltip>}>
            <Button
              variant="outline-danger"
              size="sm"
              className="rounded-circle shadow-sm"
              onClick={() => handleDelete(row.id)}
            >
              <FaTrash />
            </Button>
          </OverlayTrigger> */}
        </div>
      ),
      width: "150px",
    },
  ];

  const customStyles = {
    table: { style: { border: "none" } },
    headRow: {
      style: {
        backgroundColor: "rgb(218 217 240 / 57%);",
        color: "#000000",
        fontWeight: "bold",
        textTransform: "uppercase",
        padding: "5px",
        borderBottom: "none",
      },
    },
    headCells: { style: { padding: "5px", border: "none" } },
    rows: {
      style: {
        backgroundColor: "#FFFFFF",
        "&:hover": { backgroundColor: "#F8F9FA" },
        borderBottom: "1px solid #E9ECEF",
        padding: "10px",
      },
    },
    cells: { style: { padding: "10px", border: "none" } },
  };

  return (
    <div className="container-fluid py-1 bg-light min-vh-100" style={{ backgroundColor: "#F8F9FA", padding: "20px" }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card shadow-lg border-0" style={{ maxWidth: "1200px", width: "100%" }}>
        <div className="card-header  text-black p-3 rounded-top" style={{ backgroundColor: "rgb(220 219 240 / 59%)" }}>
          <h5 className="mb-0">
            <i className="mdi mdi-pencil-box me-2"></i> Project Record
          </h5>
        </div>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="text-muted mb-0">Total Projects: {projects.length}</h6>
            <div className="d-flex align-items-center gap-2">
              <i className="mdi mdi-magnify" style={{ fontSize: "20px", color: "#007BFF" }} />
              <Form.Control
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={handleSearch}
                className="shadow-sm"
                style={{ width: "300px", height: "38px" }}
              />
            </div>
          </div>
          <DataTable
            columns={columns}
            data={projects}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 20, 50]}
            highlightOnHover
            striped
            fixedHeader
            fixedHeaderScrollHeight="400px"
            customStyles={customStyles}
            noDataComponent={<div className="p-3 text-muted">No projects found.</div>}
          />
        </div>
      </div>

      {currentProject && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
          <Modal.Header closeButton className="bg-light">
            <Modal.Title className="text-dark">Edit Project</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Form>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="clientname"
                    value={currentProject.clientname || ""}
                    onChange={handleChange}
                    className="shadow-sm"
                    required
                    isInvalid={!currentProject.clientname} // Fixed syntax
                  />
                  <Form.Control.Feedback type="invalid">Client Name is required</Form.Control.Feedback>
                </Col>
                <Col md={6}>
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectname"
                    value={currentProject.projectname || ""}
                    onChange={handleChange}
                    className="shadow-sm"
                    required
                    isInvalid={!currentProject.projectname} // Fixed syntax
                  />
                  <Form.Control.Feedback type="invalid">Project Name is required</Form.Control.Feedback>
                </Col>
                <Col md={6}>
                  <Form.Label>Project Manager</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectmanager"
                    value={currentProject.projectmanager || ""}
                    onChange={handleChange}
                    className="shadow-sm"
                    required
                    isInvalid={!currentProject.projectmanager} // Fixed syntax
                  />
                  <Form.Control.Feedback type="invalid">Project Manager is required</Form.Control.Feedback>
                </Col>
                <Col md={6}>
                  <Form.Label>Project Duration</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectduration"
                    value={currentProject.projectduration || ""}
                    onChange={handleChange}
                    className="shadow-sm"
                    required
                    isInvalid={!currentProject.projectduration} // Fixed syntax
                  />
                  <Form.Control.Feedback type="invalid">Project Duration is required</Form.Control.Feedback>
                </Col>
                <Col md={12}>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={currentProject.status || ""}
                    onChange={handleChange}
                    className="shadow-sm"
                    required
                    isInvalid={!currentProject.status} // Fixed syntax
                  >
                    <option value="">Select Status</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">Status is required</Form.Control.Feedback>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer className="bg-light">
            <Button variant="secondary" onClick={() => setShowModal(false)} className="shadow-sm rounded-pill">
              Close
            </Button>
            <Button variant="primary" onClick={handleSave} className="shadow-sm rounded-pill">
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ProjectList;