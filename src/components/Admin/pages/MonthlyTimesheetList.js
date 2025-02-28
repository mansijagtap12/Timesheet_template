import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { saveAs } from "file-saver";
import { Form, InputGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MonthlyTimesheetList = () => {
  const [timesheetData, setTimesheetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch data (Mock API call)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        const data = [
          { id: 1, month: "January 2025", submittedBy: "Riya", fileFormat: "Excel", fileUrl: "/mock-timesheet.xlsx" },
          { id: 2, month: "January 2025", submittedBy: "Mahendra", fileFormat: "PDF", fileUrl: "/mock-timesheet.pdf" },
          { id: 3, month: "January 2025", submittedBy: "Kusuma", fileFormat: "PDF", fileUrl: "/mock-timesheet.pdf" },
          { id: 4, month: "Dec 2024", submittedBy: "Gayatri Smith", fileFormat: "PDF", fileUrl: "/mock-timesheet.pdf" },
        ];
        setTimesheetData(data);
        setFilteredData(data);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = timesheetData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
    setFilteredData(filtered);
  };

  // Download file handler
  const handleDownload = (fileUrl, fileName) => {
    saveAs(fileUrl, fileName);
  };

  // Custom styles for DataTable
  const customStyles = {
    table: { style: { border: "none", backgroundColor: "#fff" } },
    headRow: {
      style: {
        backgroundColor: "#f8f9fa",
        color: "#343a40",
        fontWeight: "600",
        textTransform: "uppercase",
        fontSize: "13px",
        borderBottom: "2px solid #dee2e6",
      },
    },
    headCells: { style: { padding: "12px" } },
    rows: {
      style: {
        "&:hover": { backgroundColor: "#f1f3f5" },
        fontSize: "14px",
        color: "#495057",
        borderBottom: "1px solid #e9ecef",
      },
    },
    cells: { style: { padding: "12px" } },
    pagination: {
      style: {
        borderTop: "1px solid #e9ecef",
        padding: "10px",
        backgroundColor: "#fff",
      },
    },
  };

  // Columns definition for DataTable
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
      cell: (row) => <span className="fw-semibold">{row.id}</span>,
    },
    {
      name: "Month",
      selector: (row) => row.month,
      sortable: true,
      cell: (row) => <span>{row.month}</span>,
    },
    {
      name: "Submitted By",
      selector: (row) => row.submittedBy,
      sortable: true,
      cell: (row) => <span className="text-muted">{row.submittedBy}</span>,
    },
    {
      name: "File Format",
      selector: (row) => row.fileFormat,
      sortable: true,
      cell: (row) => (
        <span
          className={`badge ${row.fileFormat === "Excel" ? "bg-success" : "bg-info"}`}
          style={{ fontSize: "12px", padding: "5px 10px" }}
        >
          {row.fileFormat}
        </span>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          variant="outline-primary"
          size="sm"
          className="rounded-pill shadow-sm"
          onClick={() =>
            window.open(
              "https://docs.google.com/spreadsheets/d/1nki5ArbCOuEuKPOeoVRlEFGRpdeE_FJtxjH2_2x1bMg/edit?pli=1&gid=0#gid=0",
              "_blank"
            )
          }
          title="Preview"
        >
          <i className="mdi mdi-eye" />
        </Button>
      ),
      width: "100px",
    },
    {
      name: "Download",
      cell: (row) => (
        <Button
          variant="outline-success"
          size="sm"
          className="rounded-pill shadow-sm"
          onClick={() =>
            handleDownload(
              row.fileUrl,
              `Timesheet-${row.month}.${row.fileFormat.toLowerCase()}`
            )
          }
          title="Download"
        >
          <i className="mdi mdi-download" />
        </Button>
      ),
      width: "100px",
    },
  ];

  return (
    <div className="content-wrapper" style={{ padding: "10px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card shadow-lg border-0" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <div
            className="card-header d-flex justify-content-between align-items-center"
            style={{
             backgroundColor: "rgb(220 219 240 / 59%)",
              padding: "10px 15px",
              borderBottom: "1px solid #e9ecef",
            }}
          >
            <h5 className="mb-0 d-flex align-items-center" style={{ color: "#343a40", fontWeight: "600" }}>
              <span className="me-2" style={{ fontSize: "20px", color: "#007bff" }}>
                <i className="mdi mdi-pencil-box" />
              </span>
              Monthly Timesheet Records
            </h5>
            <div className="d-flex align-items-center">
              <InputGroup style={{ maxWidth: "300px" }}>
                <InputGroup.Text
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #ced4da",
                    borderRight: "none",
                    cursor: "default",
                  }}
                >
                  <i className="mdi mdi-magnify" style={{ color: "#007bff" }} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search timesheets..."
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{
                    borderLeft: "none",
                    boxShadow: "none",
                    fontSize: "14px",
                  }}
                />
              </InputGroup>
            </div>
          </div>
          <div className="card-body p-0">
            <DataTable
              columns={columns}
              data={filteredData}
              progressPending={loading}
              progressComponent={
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 20]}
              selectableRows
              highlightOnHover
              fixedHeader
              fixedHeaderScrollHeight="400px"
              customStyles={customStyles}
              noDataComponent={
                <div className="text-center py-4 text-muted">No timesheet records found.</div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyTimesheetList;