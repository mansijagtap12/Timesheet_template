import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component"; // Import the DataTable library
import { saveAs } from "file-saver"; // For file download

const MonthlyTimesheetList = () => {
  const [timesheetData, setTimesheetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [loading, setLoading] = useState(true);
 
  const [showSearch, setShowSearch] = useState(false); // State for controlling the visibility of the search box

  // Handle search input change
 


  // Fetch data (Mock API call for now)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        const data = [
          {
            id: 1,
            month: "January 2025",
            submittedBy: "Riya",
            fileFormat: "Excel",
            fileUrl: "/mock-timesheet.xlsx",
          },
          {
            id: 2,
            month: "January 2025",
            submittedBy: "Mahendra",
            fileFormat: "PDF",
            fileUrl: "/mock-timesheet.pdf",
          },
          {
            id: 3,
            month: "January 2025",
            submittedBy: "Kusuma ",
            fileFormat: "PDF",
            fileUrl: "/mock-timesheet.pdf",
          },
          {
            id: 4,
            month: "Dec 2024",
            submittedBy: "Gayatri Smith",
            fileFormat: "PDF",
            fileUrl: "/mock-timesheet.pdf",
          },
        ];
        setTimesheetData(data);
        setFilteredData(data); // Initialize filtered data
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
    saveAs(fileUrl, fileName); // Use `file-saver` library
  };

  // Columns definition for DataTable
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Month",
      selector: (row) => row.month,
      sortable: true,
    },

    {
      name: "Submitted By",
      selector: (row) => row.submittedBy,
      sortable: true,
    },
    {
      name: "File Format",
      selector: (row) => row.fileFormat,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          style={{
            padding: "5px 10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={() => window.open(row.fileUrl, "_blank")}
        >
          <i className="mdi mdi-eye" title="Preview"></i>
        </button>
      ),
      
    },
    {
      name: "Download",
      cell: (row) => (
        <button
          style={{
            padding: "5px 10px",
            backgroundColor: "#28A745",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={() =>
            handleDownload(
              row.fileUrl,
              `Timesheet-${row.month}.` + row.fileFormat.toLowerCase()
            )
          }
        >
          <i className="mdi mdi-download" title="Download"></i>
        </button>
      ),
    },
  ];

  return (
    <div className="content-wrapper">
       <div className="d-flex justify-content-end" style={{ padding: "0px" }}>
        {/* Search Icon */}
        <i className="mdi mdi-magnify"
         
          style={{
            cursor: "pointer",
            fontSize: "20px",
            padding: "5px",
            marginLeft:"100px",
            marginTop:" -32px",
            color:"blue",
          }}
          onClick={() => setShowSearch(!showSearch)} // Toggle search box visibility
          title="Search"/>

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
              marginTop:" -32px",
            }}
          />
        )}
      </div>
    
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="page-header">
              <h5 className="page-title">
                <span className="page-title-icon text-dark me-2">
                  <i className="mdi mdi-pencil-box"></i>
                </span>
                Monthly Timesheet Records
              </h5>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Employee Record
                  </li>
                </ol>
              </nav>
            </div>

            <hr />

            {/* Data Table */}
            <DataTable
              columns={columns}
              data={filteredData} // Use filteredData instead of timesheetData
              progressPending={loading}
              pagination
              selectableRows
              highlightOnHover
              fixedHeader
              fixedHeaderScrollHeight="300px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyTimesheetList;
