import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Row, Col, Modal, Form, Nav, Tab } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PencilSquare, ArrowLeft } from "react-bootstrap-icons";

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const stateEmployee = location.state?.employee;
        if (stateEmployee && stateEmployee.id === id) {
          setEmployee({
            ...stateEmployee,
            skills: Array.isArray(stateEmployee.skills) ? stateEmployee.skills : [],
            education: Array.isArray(stateEmployee.education) ? stateEmployee.education : [],
          });
          setFormData({
            ...stateEmployee,
            skills: Array.isArray(stateEmployee.skills) ? stateEmployee.skills : [],
            education: Array.isArray(stateEmployee.education) ? stateEmployee.education : [],
          });
          setLoading(false);
        } else {
          const response = await axios.get(
            `https://vkrafthrportalbackend.onrender.com/api/users/get_by_id/${id}`
          );
          setEmployee({
            ...response.data,
            skills: Array.isArray(response.data.skills) ? response.data.skills : [],
            education: Array.isArray(response.data.education) ? response.data.education : [],
          });
          setFormData({
            ...response.data,
            skills: Array.isArray(response.data.skills) ? response.data.skills : [],
            education: Array.isArray(response.data.education) ? response.data.education : [],
          });
          setLoading(false);
        }
      } catch (error) {
        setError(error.message || "Failed to fetch employee details");
        setLoading(false);
        toast.error("Failed to load employee details");
      }
    };
    fetchEmployee();
  }, [id, location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();

      // Append all text fields to FormData
      Object.keys(formData).forEach((key) => {
        if (key !== "certification") {
          formDataToSend.append(key, formData[key] || ""); // Handle undefined/null values
        }
      });

      // Append certification file if it exists
      if (formData.certification instanceof File) {
        formDataToSend.append("certification", formData.certification);
      }

      // Use the id from useParams() in the API call
      const response = await axios.put(
        `https://vkrafthrportalbackend.onrender.com/api/users/edit_user/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update the employee state with the response data, ensuring skills and education are arrays
      setEmployee({
        ...response.data,
        skills: Array.isArray(response.data.skills) ? response.data.skills : [],
        education: Array.isArray(response.data.education) ? response.data.education : [],
      });
      setShowEditModal(false);
      toast.success(`Employee with ID ${id} updated successfully!`);
    } catch (error) {
      toast.error(`Failed to update employee with ID ${id}: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="text-center p-4 bg-white rounded shadow">
          <div className="spinner-border text-primary mb-3" role="status" />
          <p>Loading employee profile...</p>
        </div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="text-center p-4 bg-white rounded shadow">
          <p className="text-danger mb-3">{error || "Employee not found"}</p>
          <Button variant="primary" onClick={() => navigate("/employee-list")}>
            <ArrowLeft className="me-2" /> Back to List
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-2 bg-light min-vh-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="text-dark fw-bold">
            <span className="text-primary">Employee:</span> {employee.firstname}{" "}
            {employee.lastname}
          </h5>
          <div>
            <Button
              variant="outline-primary"
              className="me-2"
              onClick={() => setShowEditModal(true)}
            >
              <PencilSquare className="me-2" /> Edit
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => navigate("/employee-list")}
            >
              <ArrowLeft className="me-2" /> Back
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Row className="g-4">
          {/* Left Card - Profile Summary */}
          <Col lg={4}>
            <div className="bg-white rounded shadow p-4 h-100">
              <div className="text-center">
                <img
                  src={
                    employee.profile_picture ||
                    "/assets/images/faces-clipart/pic-2.png"
                  }
                  alt="Profile"
                  className="rounded-circle border border-primary border-2 mb-3"
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                  }}
                  onError={(e) =>
                    (e.target.src = "/assets/images/faces-clipart/pic-2.png")
                  }
                />
                <h4 className="fw-bold text-dark">
                  {employee.firstname} {employee.lastname}
                </h4>
                <p className="text-muted mb-2">{employee.jobtitle || "N/A"}</p>
                <span
                  className={`badge ${
                    employee.account_status === "Active"
                      ? "bg-success"
                      : "bg-danger"
                  } px-3 py-1`}
                >
                  {employee.account_status || "Inactive"}
                </span>
              </div>
              <hr className="my-3" />
              <div className="mt-3">
                <p>
                  <strong>Email:</strong> {employee.email}
                </p>
                <p>
                  <strong>Phone:</strong> {employee.phonenumber}
                </p>
                <p>
                  <strong>DOB:</strong> {employee.dateofbirth || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {employee.address || "N/A"}
                </p>
              </div>
            </div>
          </Col>

          {/* Right Section - Detailed Info */}
          <Col lg={8}>
            <div className="bg-white rounded shadow p-4">
              <Tab.Container defaultActiveKey="details">
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="details">Details</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="skills">Skills & Education</Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  {/* Details Tab */}
                  <Tab.Pane eventKey="details">
                    <Row>
                      <Col md={6}>
                        <h6 className="text-primary mb-3">Work Information</h6>
                        <p>
                          <strong>Employee ID:</strong> {employee.emp_id}
                        </p>
                        <p>
                          <strong>Hire Date:</strong>{" "}
                          {employee.hiredate || "N/A"}
                        </p>
                        <p>
                          <strong>Experience:</strong>{" "}
                          {employee.overall_experience || "N/A"}
                        </p>
                        <p>
                          <strong>Designation:</strong>{" "}
                          {employee.designation || "N/A"}
                        </p>
                      </Col>
                      <Col md={6}>
                        <h6 className="text-primary mb-3">
                          Project Information
                        </h6>
                        <p>
                          <strong>Work Assignment:</strong>{" "}
                          {employee.work_assignment_status || "N/A"}
                        </p>
                        <p>
                          <strong>Work Location:</strong>{" "}
                          {employee.work_location || "N/A"}
                        </p>
                        <p>
                          <strong>Manager ID:</strong>{" "}
                          {employee.managerid || "N/A"}
                        </p>
                        <p>
                          <strong>Status:</strong>
                          <span
                            className={`badge ${
                              employee.status === "Active"
                                ? "bg-success"
                                : "bg-info"
                            } ms-2`}
                          >
                            {employee.status || "Not Assigned"}
                          </span>
                        </p>
                      </Col>
                    </Row>
                  </Tab.Pane>

                  {/* Skills & Education Tab */}
                  <Tab.Pane eventKey="skills">
                    <div className="p-3">
                      {/* Skills Section */}
                      <h6
                        className="text-primary mb-4 fw-bold"
                        style={{
                          borderBottom: "2px solid #007bff",
                          display: "inline-block",
                          paddingBottom: "5px",
                        }}
                      >
                        Skills
                      </h6>
                      <div className="mb-4 d-flex flex-wrap gap-2">
                        {employee.skills.length > 0 ? (
                          employee.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="badge bg-primary text-white rounded-pill px-3 py-2"
                              style={{
                                fontSize: "0.9rem",
                                transition: "transform 0.2s ease-in-out",
                                cursor: "default",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.transform = "scale(1.05)")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.transform = "scale(1)")
                              }
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-muted fst-italic">
                            No skills listed
                          </p>
                        )}
                      </div>

                      {/* Education Section */}
                      <h6
                        className="text-primary mb-3 fw-bold"
                        style={{
                          borderBottom: "2px solid #007bff",
                          display: "inline-block",
                          paddingBottom: "5px",
                        }}
                      >
                        Education
                      </h6>
                      {employee.education.length > 0 ? (
                        <table
                          className="table table-borderless table-hover"
                          style={{ fontSize: "0.9rem" }}
                        >
                          <thead>
                            <tr className="bg-light">
                              <th scope="col" className="py-2">
                                Degree
                              </th>
                              <th scope="col" className="py-2">
                                University
                              </th>
                              <th scope="col" className="py-2">
                                Year
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {employee.education.map((edu, index) => (
                              <tr key={index}>
                                <td className="py-2">{edu.degree || "N/A"}</td>
                                <td className="py-2">
                                  {edu.university || "N/A"}
                                </td>
                                <td className="py-2">{edu.year || "N/A"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-muted fst-italic">
                          No education details
                        </p>
                      )}
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </Col>
        </Row>
      </div>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
      >
        <Modal.Header
          closeButton
          className="text-black"
          style={{ backgroundColor: "rgb(220 219 240 / 59%)" }}
        >
          <Modal.Title>Edit Employee Profile (ID: {id})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Personal Information */}
            <h6 className="text-primary mb-3 fw-bold">Personal Information</h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={formData.firstname || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={formData.lastname || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="middlename"
                    value={formData.middlename || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateofbirth"
                    value={formData.dateofbirth || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Marital Status</Form.Label>
                  <Form.Select
                    name="marital_status"
                    value={formData.marital_status || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Contact Information */}
            <h6 className="text-primary mb-3 fw-bold">Contact Information</h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phonenumber"
                    value={formData.phonenumber || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Official Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="official_email_id"
                    value={formData.official_email_id || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Personal Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="personal_email"
                    value={formData.personal_email || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={formData.state || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Zipcode</Form.Label>
                  <Form.Control
                    type="text"
                    name="zipcode"
                    value={formData.zipcode || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={formData.country || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Work Information */}
            <h6 className="text-primary mb-3 fw-bold">Work Information</h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="emp_id"
                    value={formData.emp_id || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="jobtitle"
                    value={formData.jobtitle || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    name="designation"
                    value={formData.designation || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Hire Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="hiredate"
                    value={formData.hiredate || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Overall Experience</Form.Label>
                  <Form.Control
                    type="text"
                    name="overall_experience"
                    value={formData.overall_experience || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Work Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="work_location"
                    value={formData.work_location || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Work Assignment</Form.Label>
                  <Form.Control
                    type="text"
                    name="work_assignment_status"
                    value={formData.work_assignment_status || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Manager ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="managerid"
                    value={formData.managerid || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="text"
                    name="salary"
                    value={formData.salary || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Account Status</Form.Label>
                  <Form.Select
                    name="account_status"
                    value={formData.account_status || ""}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Certifications */}
            <h6 className="text-primary mb-3 fw-bold">Certifications</h6>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Certification (PDF/Image)</Form.Label>
                  <Form.Control
                    type="file"
                    name="certification"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFormData((prev) => ({
                          ...prev,
                          certification: file,
                        }));
                      }
                    }}
                  />
                  <Form.Text className="text-muted">
                    Upload a new certification file to replace the existing one,
                    if any.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeProfile;