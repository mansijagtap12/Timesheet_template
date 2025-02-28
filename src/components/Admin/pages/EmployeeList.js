import React, { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip, Popover, Badge } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [employees, setEmployees] = useState([]);
  const [originalEmployees, setOriginalEmployees] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(null);
  const [project, setProject] = useState(""); // Will store project ID
  const [position, setPosition] = useState("");
  const [client, setClient] = useState(""); // Will store client name (since client_id is not consistent)
  const [status, setStatus] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [projectsList, setProjectsList] = useState([]);
  const navigate = useNavigate();

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://vkrafthrportalbackend.onrender.com/api/users/get_all_users"
        );
        const jsonData = await response.json();

        if (jsonData.data && Array.isArray(jsonData.data)) {
          setEmployees(jsonData.data);
          setOriginalEmployees(jsonData.data);
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
  }, []);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://vkrafthrportalbackend.onrender.com/api/projects/get_all_projects"
        );
        if (response.data && Array.isArray(response.data.data)) {
          setProjectsList(response.data.data);
        } else {
          console.error("Invalid projects API response:", response.data);
          setProjectsList([]);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjectsList([]);
      }
    };

    fetchProjects();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setShowModal(true);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "" || !selectedColumn) {
      setEmployees(originalEmployees);
    } else {
      const filteredEmployees = originalEmployees.filter((employee) =>
        String(employee[selectedColumn] || "")
          .toLowerCase()
          .includes(term)
      );
      setEmployees(filteredEmployees);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(
          `https://vkrafthrportalbackend.onrender.com/api/users/delete/${id}`
        );
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.id !== id)
        );
        setOriginalEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.id !== id)
        );
        toast.success("Employee deleted successfully!");
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast.error("Failed to delete employee!");
      }
    }
  };

  const handleSave = () => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === currentEmployee.id ? { ...emp, ...currentEmployee } : emp
    );
    setEmployees(updatedEmployees);
    setOriginalEmployees(updatedEmployees);
    setShowModal(false);
    toast.success("Data updated successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee((prevState) => ({
      ...prevState,
      [name]: name === "skills" ? value.split(",") : value,
    }));
  };

  const handleAssignProject = async (e, employeeId) => {
    e.preventDefault();

    // Validation
    if (!client || !project || !position || !status || (status === "billable" && !poNumber)) {
      toast.error("Please fill all required fields!");
      return;
    }

    const selectedProject = projectsList.find(p => p.id === parseInt(project));
    const projectData = {
      projects: project, // Sending project ID
      work_assignment_status: selectedProject?.projectname || "",
      project_status: status,
      project_position: position,
      client_name: client, // Using client name since client_id is not consistent
      ...(status === "billable" && { po_number: poNumber })
    };

    try {
      // Update employee with project details
      const response = await axios.put(
        `https://vkrafthrportalbackend.onrender.com/api/users/edit_user/${employeeId}`,
        projectData
      );

      // Update local state
      const updatedEmployees = employees.map((emp) =>
        emp.id === employeeId
          ? { 
              ...emp, 
              projects: project,
              work_assignment_status: projectData.work_assignment_status,
              project_status: status,
              project_position: position,
              client_name: client,
              ...(status === "billable" && { po_number: poNumber })
            }
          : emp
      );
      setEmployees(updatedEmployees);
      setOriginalEmployees(updatedEmployees);

      toast.success("Project assigned successfully!");
      // Reset form and close modal
      setProject("");
      setPosition("");
      setClient("");
      setStatus("");
      setPoNumber("");
      setShowAssignModal(null);
    } catch (error) {
      console.error("Error assigning project:", error);
      toast.error("Failed to assign project!");
    }
  };

  const customStyles = {
    table: { style: { border: "none" } },
    headRow: {
      style: {
        backgroundColor: "rgb(218 217 240 / 77%)",
        color: "black",
        fontWeight: "bold",
        textTransform: "uppercase",
        padding: "1px",
        borderBottom: "none",
      },
    },
    headCells: { style: { padding: "12px", border: "none" } },
    rows: {
      style: {
        backgroundColor: "#FFFFFF",
        "&:hover": { backgroundColor: "#F8F9FA" },
        borderBottom: "1px solid #E9ECEF",
        padding: "2px",
      },
    },
    cells: { style: { padding: "10px", border: "none" } },
  };

  const columns = [
    {
      name: "Profile",
      selector: (row) => (
        <img
          src={row.image || "/assets/images/faces-clipart/pic-1.png"}
          alt="Employee"
          style={{ width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer" }}
          onClick={() =>
            navigate(`/Employee-profile/${row.id}`, {
              replace: true,
              state: { employee: row },
            })
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/images/faces-clipart/pic-2.png";
          }}
          className="shadow-sm"
        />
      ),
      sortable: false,
      width: "10%",
    },
    {
      name: "Name",
      selector: (row) => row.user,
      sortable: true,
      cell: (row) => (
        <span
          className="text-dark fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate(`/Employee-profile/${row.id}`, { state: { employee: row } })
          }
        >
          {row.user}
        </span>
      ),
    },
    {
      name: "Project",
      selector: (row) => row.work_assignment_status || "Not Assigned",
      sortable: true,
      cell: (row) => (
        <span
          className="text-muted"
          style={{ cursor: "pointer" }}
          onClick={() => setShowAssignModal(row.id)}
        >
          {row.work_assignment_status || "Assign Project"}
        </span>
      ),
    },
    {
      name: "RM",
      selector: (row) => row.city || "N/A",
      sortable: true,
      cell: (row) => <span className="text-muted">{row.city || "N/A"}</span>,
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

        const maxDisplay = 2;
        const displayedSkills = skills.slice(0, maxDisplay);
        const hasMore = skills.length > maxDisplay;

        const popover = (
          <Popover id={`popover-${row.id}`}>
            <Popover.Header
              as="h3"
              style={{ backgroundColor: "#007bff", color: "white" }}
            >
              All Skills
            </Popover.Header>
            <Popover.Body>
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  bg="primary"
                  style={{
                    display: "inline-block",
                    margin: "3px",
                    fontSize: "12px",
                    padding: "5px 10px",
                    borderRadius: "15px",
                    backgroundColor: "#007bff",
                  }}
                >
                  {skill}
                </Badge>
              ))}
            </Popover.Body>
          </Popover>
        );

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              flexWrap: "wrap",
            }}
          >
            {displayedSkills.map((skill, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: "#e9ecef",
                  color: "#495057",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                {skill}
              </span>
            ))}
            {hasMore && (
              <OverlayTrigger trigger="click" placement="top" overlay={popover} rootClose>
                <span
                  style={{
                    cursor: "pointer",
                    color: "#007bff",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    padding: "4px 8px",
                    borderRadius: "20px",
                    backgroundColor: "#f1f3f5",
                  }}
                >
                  +{skills.length - maxDisplay}
                </span>
              </OverlayTrigger>
            )}
          </div>
        );
      },
      sortable: false,
      width: "250px",
    },
  ];

  const searchableColumns = [
    { label: "Name", value: "user" },
    { label: "Project", value: "work_assignment_status" },
    { label: "RM", value: "city" },
    { label: "Skills", value: "skills" },
  ];

  // Extract unique clients from projects (handling null clientname)
  const uniqueClients = Array.from(
    new Set(projectsList.map((proj) => proj.clientname).filter(name => name))
  ).map((name, index) => ({ id: index + 1, name }));

  return (
    <div className="container-fluid py-1 bg-light min-vh-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        className="card shadow-lg border-0"
        style={{ maxWidth: "1200px", width: "100%" }}
      >
        <div
          className="card-header text-black p-3 rounded-top"
          style={{ backgroundColor: "rgb(220 219 240 / 59%)" }}
        >
          <h5 className="mb-0 d-flex justify-content-md-center">
            <i className="mdi mdi-pencil-box me-2"></i> Employee Record
          </h5>
        </div>
        <div className="card-body p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="text-muted mb-0">
              Total Employees: {employees.length}
            </h6>
            <div className="d-flex align-items-center gap-2">
              <i
                className="mdi mdi-magnify"
                style={{ fontSize: "20px", color: "#007BFF" }}
              />
              <select
                value={selectedColumn}
                onChange={(e) => {
                  setSelectedColumn(e.target.value);
                  setSearchTerm("");
                  setEmployees(originalEmployees);
                }}
                className="form-select form-select-sm shadow-sm"
                style={{ width: "150px", height: "38px" }}
              >
                <option value="">Select Column</option>
                {searchableColumns.map((col) => (
                  <option key={col.value} value={col.value}>
                    {col.label}
                  </option>
                ))}
              </select>
              <Form.Control
                type="text"
                placeholder={`Search by ${
                  selectedColumn
                    ? searchableColumns.find(
                        (col) => col.value === selectedColumn
                      )?.label
                    : "column"
                }...`}
                value={searchTerm}
                onChange={handleSearch}
                disabled={!selectedColumn}
                className="shadow-sm"
                style={{ width: "250px", height: "38px" }}
              />
            </div>
          </div>
          <DataTable
            columns={columns}
            data={employees}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 20, 50]}
            highlightOnHover
            striped
            fixedHeader
            fixedHeaderScrollHeight="350px"
            customStyles={customStyles}
            noDataComponent={
              <div className="p-3 text-muted">No employees found.</div>
            }
          />
        </div>
      </div>

      {currentEmployee && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton className="bg-light">
            <Modal.Title className="text-dark">Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Form>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="user"
                    value={currentEmployee.user || ""}
                    onChange={handleChange}
                    className="shadow-sm"
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Project</Form.Label>
                  <Form.Control
                    type="text"
                    name="work_assignment_status"
                    value={currentEmployee.work_assignment_status || ""}
                    onChange={handleChange}
                    className="shadow-sm"
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>RM</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={currentEmployee.city || ""}
                    onChange={handleChange}
                    className="shadow-sm"
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Certification</Form.Label>
                  <Form.Control
                    type="text"
                    name="certification"
                    value={currentEmployee.work_assignment_status || ""}
                    onChange={handleChange}
                    className="shadow-sm"
                  />
                </Col>
                <Col md={12}>
                  <Form.Label>Skills</Form.Label>
                  <Form.Control
                    type="text"
                    name="skills"
                    value={
                      Array.isArray(currentEmployee.skills)
                        ? currentEmployee.skills.join(", ")
                        : currentEmployee.skills || ""
                    }
                    onChange={handleChange}
                    className="shadow-sm"
                  />
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer className="bg-light">
            <Button
              variant="secondary"
              onClick={() => setShowModal(false)}
              className="shadow-sm"
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              className="shadow-sm"
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Modal
        show={showAssignModal !== null}
        onHide={() => setShowAssignModal(null)}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="text-dark">Assign Project</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={(e) => handleAssignProject(e, showAssignModal)}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>
                  Client <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  required
                  className="shadow-sm"
                  isInvalid={!client}
                >
                  <option value="">Select Client</option>
                  {uniqueClients.map((client) => (
                    <option key={client.id} value={client.name}>
                      {client.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Client is required
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>
                  Project <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  required
                  className="shadow-sm"
                  isInvalid={!project}
                >
                  <option value="">Select Project</option>
                  {projectsList.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.projectname}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Project is required
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>
                  Position <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                  className="shadow-sm"
                  isInvalid={!position}
                >
                  <option value="">Select Position</option>
                  <option value="Team Lead">Team Lead</option>
                  <option value="Sr Developer">Sr Developer</option>
                  <option value="Jr Developer">Jr Developer</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Position is required
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>
                  Status <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="shadow-sm"
                  isInvalid={!status}
                >
                  <option value="">Select Status</option>
                  <option value="billable">Billable</option>
                  <option value="non-billable">Non-Billable</option>
                  <option value="backup">Backup</option>
                  <option value="bench">Bench</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Status is required
                </Form.Control.Feedback>
              </Col>
              {status === "billable" && (
                <Col md={6}>
                  <Form.Label>
                    PO Number <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    placeholder="Enter PO Number"
                    required
                    className="shadow-sm"
                    isInvalid={!poNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    PO Number is required for billable status
                  </Form.Control.Feedback>
                </Col>
              )}
            </Row>
            <div className="mt-3 text-end">
              <Button
                type="submit"
                variant="primary"
                className="px-4 rounded-pill shadow-sm"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeeList;