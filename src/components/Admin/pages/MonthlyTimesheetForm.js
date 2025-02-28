import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Card, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MonthlyTimesheetForm = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    setSelectedMonth(monthNames[new Date().getMonth()]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedMonth || !projectName || !clientName || !fileInputRef.current.files[0]) {
      alert("All fields are mandatory. Please fill in all the details.");
      return;
    }

    const formData = new FormData();
    formData.append("month", selectedMonth);
    formData.append("projectName", projectName);
    formData.append("clientName", clientName);
    formData.append("file", fileInputRef.current.files[0]);

    console.log("Form submitted with data:", {
      month: selectedMonth,
      projectName,
      clientName,
      file: fileInputRef.current.files[0].name,
    });

    setShowSuccessMessage(true);
    setSelectedMonth("");
    setProjectName("");
    setClientName("");
    fileInputRef.current.value = "";

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000); // Auto-dismiss after 5 seconds
  };

  return (
    <div className="container-fluid py-2 bg-light min-vh-100">
      <Row className="justify-content-center">
        <Col lg={12} md={10} sm={12}>
          <Card className="shadow-lg border-0" style={{ borderRadius: "15px", overflow: "hidden" }}>
            <Card.Header
              className="d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: "rgb(220 219 240 / 59%)",
                borderBottom: "1px solid #e9ecef",
                padding: "15px 20px",
              }}
            >
              <h5 className="mb-0 d-flex align-items-center" style={{ color: "#343a40", fontWeight: "600" }}>
                <span className="me-2" style={{ fontSize: "20px", color: "#007bff" }}>
                  <i className="mdi mdi-pencil-box" />
                </span>
                Monthly Timesheet
              </h5>
              {/* <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0" style={{ backgroundColor: "transparent" }}>
                  <li className="breadcrumb-item">
                    <a href="/dashboard" style={{ color: "#007bff", textDecoration: "none" }}>Dashboard</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/Employee-monthlyTs-list" style={{ color: "#007bff", textDecoration: "none" }}>Submitted Timesheet</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">Monthly Timesheet</li>
                </ol>
              </nav> */}
            </Card.Header>
            <Card.Body className="p-4">
              {showSuccessMessage && (
                <Alert
                  variant="success"
                  onClose={() => setShowSuccessMessage(false)}
                  dismissible
                  className="shadow-sm animate__animated animate__fadeIn"
                  style={{ borderRadius: "10px" }}
                >
                  <strong>Thank you!</strong> You have successfully submitted the{" "}
                  <strong>{selectedMonth || "timesheet"}</strong> timesheet.
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Row className="g-4">
                  <Col md={12}>
                    <Form.Group controlId="monthSelect">
                      <Form.Label>
                        <i className="mdi mdi-calendar-month-outline me-2" style={{ color: "#007bff" }} />
                        Select Month <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        required
                        className="shadow-sm"
                        style={{ borderRadius: "8px" }}
                      >
                        <option value="">Select Month</option>
                        {[
                          "January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December",
                        ].map((month) => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="projectName">
                      <Form.Label>
                        <i className="mdi mdi-briefcase-outline me-2" style={{ color: "#007bff" }} />
                        Project Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                        className="shadow-sm"
                        style={{ borderRadius: "8px" }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="clientName">
                      <Form.Label>
                        <i className="mdi mdi-account-outline me-2" style={{ color: "#007bff" }} />
                        Client Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                        className="shadow-sm"
                        style={{ borderRadius: "8px" }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="fileUpload">
                      <Form.Label>
                        <i className="mdi mdi-file-upload-outline me-2" style={{ color: "#007bff" }} />
                        Upload Timesheet (PDF/Excel) <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        accept=".pdf, .xlsx, .xls"
                        ref={fileInputRef}
                        required
                        className="shadow-sm"
                        style={{ borderRadius: "8px" }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    className="px-4 py-2 rounded-pill shadow"
                    style={{
                      background: "linear-gradient(90deg, #007bff, #0056b3)",
                      border: "none",
                      fontWeight: "500",
                    }}
                  >
                    <i className="mdi mdi-send me-2" />
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MonthlyTimesheetForm;