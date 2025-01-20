import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component"; // Import DataTable
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

const WeeklyTimesheetForm = () => {
  const [selectedWeek, setSelectedWeek] = useState("");
  const [tasks, setTasks] = useState([
    { date: "", day: "", task: "", hours: "" },
  ]);
  const [currentMonth, setCurrentMonth] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  useEffect(() => {
    // Get the current month name
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
    const today = new Date();
    setCurrentMonth(monthNames[today.getMonth()]);
  }, []);

  const handleWeekChange = (e) => setSelectedWeek(e.target.value);

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, [field]: value } : task
    );

    // Handle date change to set the day of the week
    if (field === "date") {
      const day = new Date(value).toLocaleString("en-US", { weekday: "long" }); // Get the day name
      updatedTasks[index].day = day;
    }

    setTasks(updatedTasks);
  };

  const addTask = () =>
    setTasks([...tasks, { date: "", day: "", task: "", hours: "" }]);

  const removeTask = (index) => {
    // Ensure there is at least one task to remove
    if (tasks.length > 1) {
      setTasks(tasks.filter((_, idx) => idx !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Timesheet Submitted:", { selectedWeek, tasks });

    // Set success message upon successful submission
    setSuccessMessage(
      " You have successfully submitted your weekly timesheet."
    );

    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);

    // Reset the form
    setSelectedWeek("");
    setTasks([{ date: "", day: "", task: "", hours: "" }]);
  };

  // Data table columns definition
  const columns = [
    {
      name: "Date",
      selector: "date",
      sortable: true,
      cell: (row, index) => (
        <input
          type="date"
          value={row.date || ""}
          onChange={(e) => handleTaskChange(index, "date", e.target.value)}
          className="form-control"
          required
        />
      ),
    },
    {
      name: "Day",
      selector: "day",
      sortable: true,
      cell: (row) => {
        const day = row.date
          ? new Date(row.date).toLocaleString("en-US", { weekday: "long" })
          : "";
        const isWeekend = day === "Saturday" || day === "Sunday";
        return (
          <span style={{ color: isWeekend ? "red" : "black" }} className="form-control">{day}</span>
        );
      }, // Show day based on date
    },
    {
      name: "Task Description",
      selector: "task",
      sortable: true,
      cell: (row, index) => (
        <input
          type="text"
          value={row.task}
          onChange={(e) => handleTaskChange(index, "task", e.target.value)}
          className="form-control"
          placeholder="Enter Task"
           required
        />
      ),
    },
    {
      name: "Hours Worked",
      selector: "hours",
      sortable: true,
      cell: (row, index) => (
        <input
          type="number"
          value={row.hours}
          onChange={(e) => handleTaskChange(index, "hours", e.target.value)}
          className="form-control"
           required
        />
      ),
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => removeTask(index)} // Pass index to remove
          disabled={tasks.length === 1}
        >
          <i className="mdi mdi-delete"></i> {/* Icon for remove */}
        </button>
      ),
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div className="page-header">
              <h5 className="page-title">
                <span className="page-title-icon text-dark me-2">
                  <i className="mdi mdi-calendar"></i>
                </span>
                Weekly Timesheet - {currentMonth}
              </h5>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Weekly Timesheet
                  </li>
                </ol>
              </nav>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="alert alert-success">
                <strong>Thank You!</strong>
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Week Selection */}
              <div className="d-flex justify-content-end mt-3">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={addTask}
                >
                  Add Task
                </button>
              </div>

              {/* Data Table */}
              <div className="table-responsive">
                <DataTable
                  columns={columns}
                  data={tasks}
                  noHeader
                  pagination
                  paginationPerPage={7} // Set the number of rows per page to 7
                  highlightOnHover
                />
              </div>

              {/* Submit Button */}
              <div className="d-flex justify-content-end mt-4">
                <button type="submit" className="btn btn-primary">
                  Submit Timesheet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTimesheetForm;
