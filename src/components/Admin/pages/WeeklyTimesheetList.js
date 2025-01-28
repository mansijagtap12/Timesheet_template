import React, { useState } from "react";
import DataTable from "react-data-table-component";

const WeeklyTimesheetList = () => {
  const [timesheetData, setTimesheetData] = useState([
    { id: 1, name: "John Doe", project: "Project A", hours: 40, date: "2025-01-20" },
    { id: 2, name: "Jane Smith", project: "Project B", hours: 38, date: "2025-01-19" },
    { id: 3, name: "Alice Brown", project: "Project A", hours: 42, date: "2025-01-18" },
    { id: 4, name: "Bob Johnson", project: "Project C", hours: 36, date: "2025-01-17" },
    { id: 5, name: "Charlie Davis", project: "Project B", hours: 40, date: "2025-01-16" }
  ]);
  
  const [filteredData, setFilteredData] = useState(timesheetData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = timesheetData.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true
    },
    {
      name: "Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name: "Project",
      selector: row => row.project,
      sortable: true
    },
    {
      name: "Hours",
      selector: row => row.hours,
      sortable: true
    },
    {
      name: "Date",
      selector: row => row.date,
      sortable: true
    }
  ];

  return (
    <div className="content-wrapper">
         {/* Search Icon */}
         <div className="d-flex justify-content-end">
                <i
                  className="mdi mdi-magnify"
                  style={{
                    cursor: "pointer",
                    fontSize: "20px",
                    padding: "5px",
                    marginLeft:"100px",
                    marginTop:" -32px",
                    color:"blue"
            
                  }}
                  onClick={() => setIsSearchVisible(!isSearchVisible)} // Toggle the search box visibility
                  title="Search"></i>

                {/* Search Input (only visible when isSearchVisible is true) */}
                {isSearchVisible && (
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                      padding: "5px",
                      marginLeft: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "14px",
                      width: "200px",
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
                Weekly Timesheet Records
              </h5>

             

              {/* Breadcrumb Navigation */}
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
              data={filteredData}
              pagination
              selectableRows
              highlightOnHover
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTimesheetList;
