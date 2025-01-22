import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const WeeklyTimesheetTable = () => {
  const [rows, setRows] = useState([]);
  const [currentMonthWeeks, setCurrentMonthWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);

  useEffect(() => {
    const generateWeeks = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const weeks = [];
      let startOfMonth = new Date(year, month, 1);

      while (startOfMonth.getMonth() === month) {
        const startOfWeek = new Date(startOfMonth);
        const endOfWeek = new Date(startOfMonth);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        if (endOfWeek.getMonth() !== month) {
          endOfWeek.setDate(new Date(year, month + 1, 0).getDate());
        }

        weeks.push({
          start: startOfWeek.toISOString().slice(0, 10),
          end: endOfWeek.toISOString().slice(0, 10),
        });

        startOfMonth.setDate(startOfMonth.getDate() + 7);
      }
      return weeks;
    };

    setCurrentMonthWeeks(generateWeeks());
  }, []);

  const handleWeekSelect = (week) => {
    const startDate = new Date(week.start);
    const endDate = new Date(week.end);
    const newRows = [];

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const day = date.toLocaleDateString("en-US", { weekday: "long" });
      newRows.push({
        date: date.toISOString().slice(0, 10),
        day,
        project: "",
        tasks: [],
        isWeekend: day === "Saturday" || day === "Sunday",
      });
    }

    setRows(newRows);
    setSelectedWeek(week);
  };

  const handleRowChange = (rowIndex, field, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][field] = value;
    setRows(updatedRows);
  };

  const handleTaskChange = (rowIndex, taskIndex, field, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].tasks[taskIndex][field] = value;
    setRows(updatedRows);
  };

  const addTaskToRow = (rowIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].tasks.push({ task: "", hours: "" });
    setRows(updatedRows);
  };

  const removeTaskFromRow = (rowIndex, taskIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].tasks = updatedRows[rowIndex].tasks.filter(
      (_, index) => index !== taskIndex
    );
    setRows(updatedRows);
  };

  const handleRowClick = (rowIndex) => {
    setExpandedRowIndex(expandedRowIndex === rowIndex ? null : rowIndex);
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", rows);
    alert("Data submitted successfully!");
  };

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.toLocaleDateString("en-US", { month: "long" });

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon  text-dark me-2">
                  <i className="mdi mdi-grid"></i>
                </span>
                Task Manager {currentYear} - {currentMonth}
              </h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="/dashboard">Dashboard</a>
                  </li>

                  <li class="breadcrumb-item active" aria-current="page">
                    WeeklyTimesheet
                  </li>
                </ol>
              </nav>
            </div>

            <div className="mb-3">
              <label
                htmlFor="weekSelector"
                className="form-label"
                style={{ display: "block", textAlign: "left" }}
              >
                Select Week:
              </label>
              <select
                id="weekSelector"
                className="form-select"
                onChange={(e) => handleWeekSelect(JSON.parse(e.target.value))}
              >
                <option value="">-- Select Week --</option>
                {currentMonthWeeks.map((week, index) => (
                  <option key={index} value={JSON.stringify(week)}>
                    Week {index + 1} ({week.start} to {week.end})
                  </option>
                ))}
              </select>
            </div>

            <Table bordered responsive>
              <thead className="table-dark">
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Project</th>
                  <th>Tasks</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <React.Fragment key={rowIndex}>
                    <tr
                      onClick={() => handleRowClick(rowIndex)}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          expandedRowIndex === rowIndex ? "#f8f9fa" : "",
                      }}
                    >
                      <td>
                        {expandedRowIndex === rowIndex ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronRight />
                        )}
                      </td>
                      <td style={{ color: row.isWeekend ? "red" : "inherit" }}>
                        {row.date}
                      </td>
                      <td style={{ color: row.isWeekend ? "red" : "inherit" }}>
                        {row.day}
                      </td>
                      <td>{row.project || "--"}</td>
                      <td>{row.tasks.length > 0 ? row.tasks.length : "--"}</td>
                    </tr>
                    {expandedRowIndex === rowIndex && (
                      <tr>
                        <td colSpan="5">
                          <div className="d-flex flex-column">
                            <div className="d-flex align-items-center mb-2">
                              <input
                                type="text"
                                value={row.project}
                                onChange={(e) =>
                                  handleRowChange(
                                    rowIndex,
                                    "project",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter project name"
                                className="form-control me-2"
                                style={{ flex: "1" }}
                              />
                              <button
                                onClick={() => addTaskToRow(rowIndex)}
                                className="btn btn-sm btn-success"
                              >
                                + Add Task
                              </button>
                            </div>
                            {row.tasks.map((task, taskIndex) => (
                              <div
                                className="d-flex align-items-center mb-2"
                                key={taskIndex}
                              >
                                <input
                                  type="text"
                                  value={task.task}
                                  placeholder="Task"
                                  onChange={(e) =>
                                    handleTaskChange(
                                      rowIndex,
                                      taskIndex,
                                      "task",
                                      e.target.value
                                    )
                                  }
                                  className="form-control me-2"
                                />
                                <input
                                  type="number"
                                  value={task.hours}
                                  placeholder="Hours"
                                  onChange={(e) =>
                                    handleTaskChange(
                                      rowIndex,
                                      taskIndex,
                                      "hours",
                                      e.target.value
                                    )
                                  }
                                  className="form-control me-2"
                                />
                                <button
                                  onClick={() =>
                                    removeTaskFromRow(rowIndex, taskIndex)
                                  }
                                  className="btn btn-sm btn-danger"
                                >
                                  Remove Task
                                </button>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>

            <button
              onClick={handleSubmit}
              className="btn btn-primary mt-1 d-block"
              style={{ marginLeft: "auto", marginRight: 0 }}
            >
              <i className="mdi mdi-send me-2"></i>Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTimesheetTable;
