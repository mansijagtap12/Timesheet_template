import React, { useState, useEffect, useRef } from "react";

const MonthlyTimesheetForm = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const fileInputRef = useRef(null); // Reference for file input

  useEffect(() => {
    // Set current month as default
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setSelectedMonth(monthNames[new Date().getMonth()]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    if (!selectedMonth || !projectName || !clientName || !fileInputRef.current.files[0]) {
      alert("All fields are mandatory. Please fill in all the details.");
      return;
    }

    // Prepare form data for submission
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

    // Show success message
    setShowSuccessMessage(true);

    // Reset form fields
    setSelectedMonth("");
    setProjectName("");
    setClientName("");
    fileInputRef.current.value = ""; // Reset file input
  };
  setTimeout(() => {
    setShowSuccessMessage(false);
  }, 5000);

  return (
    <div className="content-wrapper">
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            {/* Page Header */}
            <div className="page-header d-flex justify-content-between align-items-center">
              <h5 className="page-title">
                <span className="page-title-icon text-dark me-2">
                  <i className="mdi mdi-calendar"></i>
                </span>
                Monthly Timesheet
              </h5>
            </div>

            {showSuccessMessage && (
              <div className="alert alert-success" role="alert">
                <strong>Thank you!</strong> You have successfully submitted the{" "}
                <strong>{selectedMonth}</strong> timesheet.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Month Selection */}
              <div className="form-floating mb-4">
                <select
                  className="form-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  required
                >
                  <option value="">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
                <label>
                  <i className="mdi mdi-calendar-month-outline me-2"></i> Select
                  Month
                </label>
              </div>

              {/* Client and Project Name */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Project Name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      required
                    />
                    <label>
                      <i className="mdi mdi-briefcase-outline me-2"></i> Project
                      Name
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Client Name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                    />
                    <label>
                      <i className="mdi mdi-account-outline me-2"></i> Client
                      Name
                    </label>
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-4">
                <label className="form-label">
                  <i className="mdi mdi-file-upload-outline"></i> Upload
                  Timesheet (PDF/Excel)
                </label>
                <input
                  type="file"
                  className="form-control"
                  accept=".pdf, .xlsx, .xls"
                  ref={fileInputRef} // Use ref for file input
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="d-flex justify-content-end mt-4">
                <button type="submit" className="btn btn-primary">
                  <i className="mdi mdi-send me-2"></i> Submit Monthly Timesheet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyTimesheetForm;
