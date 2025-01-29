import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // FontAwesome icons for Edit and Trash
import Modal from "react-bootstrap/Modal"; // Bootstrap Modal
import Button from "react-bootstrap/Button";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const [showSearch, setShowSearch] = useState(false);
  // Sample employee data
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Gayatri Borse",
      project: "Insurance hub",
      rm: "Riya",
      skills: ["JAVA"],
      Certification: "Wordpress",
      image: "../../assets/images/emp/gayatri.jpg",
    },
    {
      id: 2,
      name: "SaiKumar",
      project: "WABA",
      rm: "Subhash",
      skills: ["Webmethod"],
      Certification: "Java",
      image: "../../assets/images/emp/yashwanth.jpg",
    },
    {
      id: 3,
      name: "Mansi Jagtap",
      project: "Airflow",
      rm: "Riya",
      skills: ["React Js"],
      Certification: "UI/UX",
      image: "../../assets/images/emp/mansi.JPG",
    },
    {
      id: 4,
      name: "Riya Ganore",
      project: "Airflow",
      rm: "Gowtham",
      skills: ["DevOps"],
      Certification: "Python",
      image: "../../assets/images/emp/Photo_Riya_Ganore.jpg",
    },
    {
      id: 5,
      name: "Dhiraj Saidane",
      project: "AIA",
      rm: "Mahendra",
      skills: ["ElK"],
      Certification: "Webmethod",
      image: "../../assets/images/emp/dhiraj.png",
    },
    {
      id: 6,
      name: "Bhagyashree",
      project: "Insurance Hub",
      rm: "Mahendra",
      skills: ["UI/UX"],
      Certification: "Webmethod / CamelK",
      image: "../../assets/images/emp/Shree.jpg",
    },
    {
      id: 7,
      name: "Kusuma",
      project: "AIA+",
      rm: "Mahendra",
      skills: ["Kafka"],
      Certification: "Webmethod",
      image: "../../assets/images/emp/kusuma.jpg",
    },
    {
      id: 8,
      name: "Vaibhavi",
      project: "WABA",
      rm: "Subhash",
      skills: ["SQL", "JAVA"],
      Certification: "Java",
      image: "../../assets/images/faces-clipart/pic-2.png",
    },
    // Add more employee objects as needed...
  ]);

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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const filteredEmployees = employees.filter((emp) => emp.id !== id);
      setEmployees(filteredEmployees); // Update employee list
      toast.error("Employee deleted successfully!"); // Show error toast
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
            <table className="table table-striped">
              <thead>
                <tr>
                  <th> User </th>
                  <th> Name </th>
                  <th> Project </th>
                  <th> RM </th>
                  <th> Certification </th>
                  <th> Skills </th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="py-1">
                      <img src={employee.image} alt="Employee" />
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.project}</td>
                    <td>{employee.rm}</td>
                    <td>{employee.Certification}</td>
                    <td>
                      <ul>
                        {employee.skills.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </td>

                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`edit-tooltip-${employee.id}`}>
                            Edit Employee
                          </Tooltip>
                        }
                      >
                        <button
                          className="btn btn-outline-success btn-sm me-2"
                          onClick={() => handleEdit(employee)}
                        >
                          <FaEdit />
                        </button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`delete-tooltip-${employee.id}`}>
                            Delete Employee
                          </Tooltip>
                        }
                      >
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(employee.id)}
                        >
                          <FaTrash />
                        </button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
