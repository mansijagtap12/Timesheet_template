import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ProjectRegistrationForm = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    clientName: "",
    projectName: "",
    projectNo: "",
    projectManager: "",
    projectduration: "",
    remark: "",
    status: "",
  });

  // Validation and loading state
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Check Bootstrap form validity
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Custom validation
    if (!/^[a-zA-Z\s]+$/.test(formData.clientName)) {
      setError("Client Name should only contain letters and spaces");
      setValidated(true);
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.projectName)) {
      setError("Project Name should only contain letters and spaces");
      setValidated(true);
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.projectManager)) {
      setError("Project Manager should only contain letters and spaces");
      setValidated(true);
      return;
    }

    if (!/^\d+\s*(months|month)$/.test(formData.projectduration.trim())) {
      setError(
        "Project Duration must be a number followed by 'month' or 'months' (e.g., '3 months')"
      );
      setValidated(true);
      return;
    }

    setError(null);
    setLoading(true);

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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      setLoading(false);

      if (response.ok) {
        alert("Project registered successfully!");
        setFormData({
          clientName: "",
          projectName: "",
          projectNo: "",
          projectManager: "",
          projectduration: "",
          remark: "",
          status: "",
        });
        setValidated(false); // Reset validation state
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
    <div
      className="container-fluid py-2"
      style={{ background: "#f4f6f9", minHeight: "100vh" }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-10">
          <div className="card shadow-lg rounded-4 border-0">
            <div
              className="card-header text-center text-black rounded-top"
              style={{ backgroundColor: "rgb(220 219 240 / 59%)" }}
            >
              <h5 className="mb-0 d-flex justify-content-md-center">
                <i className="mdi mdi-pencil-box me-2"></i> Project Registration
              </h5>
            </div>
            <div className="card-body p-4">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="clientName">
                      <Form.Label className="fw-semibold">
                        Client Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="shadow-sm"
                        name="clientName"
                        placeholder="Enter Client Name"
                        required
                        value={formData.clientName}
                        onChange={handleChange}
                        pattern="[a-zA-Z\s]+"
                        isInvalid={
                          validated &&
                          (!formData.clientName ||
                            !/^[a-zA-Z\s]+$/.test(formData.clientName))
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid client name (letters and spaces
                        only)
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="projectName">
                      <Form.Label className="fw-semibold">
                        Project Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="shadow-sm"
                        name="projectName"
                        placeholder="Enter Project Name"
                        required
                        value={formData.projectName}
                        onChange={handleChange}
                        pattern="[a-zA-Z\s]+"
                        isInvalid={
                          validated &&
                          (!formData.projectName ||
                            !/^[a-zA-Z\s]+$/.test(formData.projectName))
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid project name (letters and spaces
                        only)
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="projectManager">
                      <Form.Label className="fw-semibold">
                        Project Manager <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="shadow-sm"
                        name="projectManager"
                        placeholder="Enter Project Manager"
                        required
                        value={formData.projectManager}
                        onChange={handleChange}
                        pattern="[a-zA-Z\s]+"
                        isInvalid={
                          validated &&
                          (!formData.projectManager ||
                            !/^[a-zA-Z\s]+$/.test(formData.projectManager))
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid project manager name (letters and
                        spaces only)
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="projectduration">
                      <Form.Label className="fw-semibold">
                        Duration of Project{" "}
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="shadow-sm"
                        name="projectduration"
                        placeholder="Enter Project Duration in months (e.g., 3 months)"
                        required
                        value={formData.projectduration}
                        onChange={handleChange}
                        isInvalid={
                          validated &&
                          (!formData.projectduration ||
                            !/^\d+\s*(months|month)$/.test(
                              formData.projectduration.trim()
                            ))
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid duration (e.g., "3 months")
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="remark">
                      <Form.Label className="fw-semibold">Remark</Form.Label>
                      <Form.Control
                        as="textarea"
                        className="shadow-sm"
                        name="remark"
                        rows="2"
                        placeholder="Add remarks..."
                        value={formData.remark}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="status">
                      <Form.Label className="fw-semibold">
                        Status <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        className="shadow-sm"
                        name="status"
                        required
                        value={formData.status}
                        onChange={handleChange}
                        isInvalid={validated && !formData.status}
                      >
                        <option value="">Select Status</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="on-hold">On Hold</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select a status
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Error Message */}
                {error && (
                  <p className="text-danger mt-3 text-center">{error}</p>
                )}

                {/* Submit & Cancel Buttons */}
                <div className="text-end mt-4">
                  <Button
                    type="button"
                    variant="outline-secondary"
                    className="me-2 px-4"
                    onClick={() => navigate("/Project-List")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="px-4"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectRegistrationForm;
