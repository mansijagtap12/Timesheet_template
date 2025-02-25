import React, { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"; // FontAwesome icons for Edit and Trash
import Modal from "react-bootstrap/Modal"; // Bootstrap Modal
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";
import axios from "axios";

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const [showSearch, setShowSearch] = useState(false);
  // Sample employee data
  const [employees, setEmployees] = useState([]);
  const [originalEmployees, setOriginalEmployees] = useState(employees);
  const [showAssignModal, setShowAssignModal] = useState(null);
  const [project, setProject] = useState("");
  const [position, setPosition] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://vkrafthrportalbackend.onrender.com/api/users/get_all_users"
        );
        const jsonData = await response.json();

        if (jsonData.data && Array.isArray(jsonData.data)) {
          setEmployees(jsonData.data);
          setOriginalEmployees(jsonData.data); // Save original data once
        } else {
          console.error("Invalid API response format:", jsonData);
          setEmployees([]);
          setOriginalEmployees([]);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []); // No dependency on employees here

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  // Handle Edit action
  const handleEdit = (employee) => {
    setCurrentEmployee(employee); // Set the current employee to edit
    setShowModal(true); // Show the modal
  };
  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setEmployees(originalEmployees); // Reset to original data when input is empty
    } else {
      const filteredEmployees = originalEmployees.filter((employee) =>
        Object.values(employee).some((value) =>
          String(value).toLowerCase().includes(term)
        )
      );
      setEmployees(filteredEmployees); // Filtered data when there is input
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(
          `https://vkrafthrportalbackend.onrender.com/api/users/delete/${id}`
        );

        // Remove employee from the list after successful deletion
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.id !== id)
        );

        toast.success("Employee deleted successfully!");
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast.error("Failed to delete employee!");
      }
    }
  };

  // Handle Save Changes in Modal
  const handleSave = () => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === currentEmployee.id ? { ...emp, ...currentEmployee } : emp
    );
    setEmployees(updatedEmployees); // Update employee list
    setShowModal(false); // Close the modal
    toast.success("Data updated successfully!"); // Show success toast
  };
  const [employeeData, setEmployeeData] = useState([]);
  const updateTable = (newData) => {
    setEmployeeData((prevData) => [...prevData, newData]);
  };
  // Handle input change in Modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee((prevState) => ({
      ...prevState,
      [name]: name === "skills" ? value.split(",") : value, // Split skills by comma
    }));
  };
  const handleAssignProject = (e, employeeId) => {
    e.preventDefault();

    // Perform your API call or data handling logic
    console.log("Assigning project:", project, position, employeeId);

    // Simulate API call
    setTimeout(() => {
      // Close the modal after submission
      setShowAssignModal(null);
    }, 100);
  };
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    navigate("/Employee-profile", { state: { employee } }); // ✅ Passing state instead of ID in URL
  };

  const columns = [
    {
      name: "User",
      selector: (row) => (
        <img
          src={row.image || "/assets/images/faces-clipart/pic-1.png"} // Absolute path
          alt="Employee"
          width="30"
          height="30"
          onClick={() =>
            navigate(`/Employee-profile/${row.id}`, {
              replace: true,
              state: { employee: row },
            })
          } // ✅ Absolute path
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/images/faces-clipart/pic-2.png"; // ✅ Absolute path
          }}
        />
      ),
      sortable: false,
    },

    {
      name: "Name",
      selector: (row) => row.user,
      sortable: true,
    },
    {
      name: "Project",
      selector: (row) => row.work_assignment_status,
      sortable: true,
    },
    {
      name: "RM",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "Skills",
      selector: (row) => {
        const skills =
          typeof row.skills === "string"
            ? row.skills
                .replace(/[{}"]+/g, "")
                .split(",")
                .map((skill) => skill.trim())
            : Array.isArray(row.skills)
            ? row.skills.map((skill) => skill.trim())
            : [];

        const displaySkills =
          skills.length > 2
            ? `${skills.slice(0, 2).join(", ")}...`
            : skills.join(", ") || "No Skills";

        return (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`tooltip-${row.id}`}>
                {skills.length > 0 ? skills.join(", ") : "No Skills"}
              </Tooltip>
            }
          >
            <span
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "blue",
              }}
            >
              {displaySkills}
            </span>
          </OverlayTrigger>
        );
      },
      sortable: false,
    },
    {
      name: "Action",
      width: "150px",
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Edit Employee</Tooltip>}
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
            overlay={<Tooltip>Delete Employee</Tooltip>}
          >
            <button
              className="btn btn-outline-danger btn-sm me-2"
              onClick={() => handleDelete(row.id)}
            >
              <FaTrash />
            </button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Assign Project</Tooltip>}
          >
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={() => setShowAssignModal(row.id)}
            >
              <FaPlus />
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
                Employee Record
              </h5>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/Employee-Registration-Form">Register Employee</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Employee Record
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
              data={employees}
              onRowClicked={(row) =>
                navigate(`/Employee-profile/${row.id}`, {
                  state: { employee: row },
                })
              }
              pagination
              highlightOnHover
              striped
              fixedHeader
              dense
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
      {/* Modal for editing employee details */}
      {currentEmployee && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={currentEmployee.user}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Project</label>
                    <input
                      type="text"
                      className="form-control"
                      name="project"
                      value={currentEmployee.work_assignment_status}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>RM</label>
                    <input
                      type="text"
                      className="form-control"
                      name="rm"
                      value={currentEmployee.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>project</label>
                    <input
                      type="text"
                      className="form-control"
                      name="certification"
                      value={currentEmployee.work_assignment_status}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Skills</label>
                    <input
                      type="text"
                      className="form-control"
                      name="skills"
                      value={currentEmployee.skills}
                      onChange={handleChange}
                    />
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

      {/* modal for assign project*/}

      <Modal
        show={showAssignModal !== null}
        onHide={() => setShowAssignModal(null)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleAssignProject(e, showAssignModal)}>
            <div className="container mt-1 p-1 bg-white shadow-sm rounded">
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

              <div className="col-md-12 text-end">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default EmployeeList;
