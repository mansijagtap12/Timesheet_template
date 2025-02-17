import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // FontAwesome icons for Edit and Trash
import Modal from "react-bootstrap/Modal"; // Bootstrap Modal
import Button from "react-bootstrap/Button";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";
import axios from "axios";

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const [showSearch, setShowSearch] = useState(false);
  // Sample employee data
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://vkrafthrportalbackend.onrender.com/api/users"
        ); // Replace with your API
        const jsonData = await response.json();

        if (jsonData.data && Array.isArray(jsonData.data)) {
          setEmployees(jsonData.data); // ✅ Store API response in state
        } else {
          console.error("Invalid API response format:", jsonData);
          setEmployees([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

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

    const filteredEmployees = employees.filter((employee) =>
      Object.values(employee).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
    setEmployees(filteredEmployees); // Update the employee list based on search term
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`https://vkrafthrportalbackend.onrender.com/api/users/delete/${id}`);
  
        // Remove employee from the list after successful deletion
        setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));
  
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

  // Handle input change in Modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee((prevState) => ({
      ...prevState,
      [name]: name === "skills" ? value.split(",") : value, // Split skills by comma
    }));
  };

  const columns = [
    {
      name: "User",
      selector: (row) => (
        <img
          src={
            row.image
              ? row.image
              : "../../assets/images/faces-clipart/pic-1.png"
          }
          alt="Employee"
          width="40"
          height="40"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/50";
          }}
        />
      ),
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.firstname,
      sortable: true,
    },
    {
      name: "Project",
      selector: (row) => row.project,
      sortable: true,
    },
    {
      name: "RM",
      selector: (row) => row.managerid,
      sortable: true,
    },
    {
      name: "Certification",
      selector: (row) => row.Certification,
      sortable: true,
    },
    {
      name: "Skills",
      selector: (row) =>
        Array.isArray(row.skills) ? row.skills.join(", ") : "No Skills",
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
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
      pagination
      highlightOnHover
      striped
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
                      value={currentEmployee.name}
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
                      value={currentEmployee.project}
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
                      value={currentEmployee.rm}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Certification</label>
                    <input
                      type="text"
                      className="form-control"
                      name="certification"
                      value={currentEmployee.Certification}
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
    </div>
  );
};
export default EmployeeList;
