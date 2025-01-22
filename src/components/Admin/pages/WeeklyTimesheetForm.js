import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const WeeklyTimesheetForm = () => {
  const [rows, setRows] = useState([{ date: "", project: "", tasks: [] }]);

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

  const addRow = () => {
    setRows([...rows, { date: "", project: "", tasks: [] }]);
  };

  const removeRow = (rowIndex) => {
    const updatedRows = rows.filter((_, index) => index !== rowIndex);
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

  const handleSubmit = () => {
    console.log("Submitted Data:", rows);
    alert("Data submitted successfully!");
  };

  return (
    <div className="content-wrapper">
      <div className="container ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="page-header">
                <h5 className="page-title">
                  <span className="page-title-icon  text-dark me-2">
                    <i className="mdi mdi-pencil-box"></i>
                  </span>
                  Weekly Timesheet
                </h5>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Dashboard</a>
                    </li>

                    <li className="breadcrumb-item active" aria-current="page">
                      WeeklyTimesheet
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="accordion" id="taskManagerAccordion">
                {rows.map((row, rowIndex) => (
                  <div className="card mb-3" key={rowIndex}>
                    {/* Card Header with Collapse Toggle */}
                    <div
                      className="card-header p-2"
                      role="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapseRow${rowIndex}`}
                      aria-expanded="false"
                      aria-controls={`collapseRow${rowIndex}`}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span>
                          Day {rowIndex + 1} - {row.project || "No Project"} (
                          {row.date || "No Date"} - {row.day || "No Date"} )
                        </span>
                        <i className="mdi mdi-chevron-double-down"></i>
                      </div>
                    </div>

                    {/* Collapsible Card Body */}
                    <div
                      id={`collapseRow${rowIndex}`}
                      className="collapse"
                      data-bs-parent="#taskManagerAccordion"
                    >
                      <div className="card-body">
                        <div className="row mb-1">
                          <div className="row mb-1 ">
                            {/* Date Input */}
                            <div className="col-md-3">
                              <input
                                type="date"
                                value={row.date}
                                onChange={(e) => {
                                  const newDate = e.target.value;
                                  handleRowChange(rowIndex, "date", newDate);

                                  // Automatically set the day based on the selected date
                                  const dayOfWeek = new Date(
                                    newDate
                                  ).toLocaleDateString("en-US", {
                                    weekday: "long",
                                  });
                                  handleRowChange(rowIndex, "day", dayOfWeek);
                                }}
                                className="form-control"
                                placeholder="Date"
                              />
                            </div>

                            {/* Day Input */}
                            <div className="col-md-2">
                              <input
                                type="text"
                                value={row.day}
                                className="form-control"
                                placeholder="Day"
                                disabled // Make the day input non-editable
                              />
                            </div>

                            {/* Project Input */}
                            <div className="col-md-4">
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
                                className="form-control"
                                placeholder="Project"
                              />
                            </div>
                            {/* Buttons */}
                            <div className="col-md-3">
                              <div className="d-flex gap-1">
                                <button
                                  onClick={() => addTaskToRow(rowIndex)}
                                  className="btn btn-success"
                                >
                                  + Task
                                </button>
                                <button
                                  onClick={() => removeRow(rowIndex)}
                                  className="btn btn-danger"
                                >
                                  <i className="mdi mdi-delete"> </i>Row
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Task Table */}
                        {row.tasks.length > 0 && (
                          <table className="table table-bordered mt-3">
                            <thead className="table-dark">
                              <tr>
                                <th>Task</th>
                                <th>Hours</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {row.tasks.map((task, taskIndex) => (
                                <tr key={taskIndex}>
                                  <td>
                                    <input
                                      type="text"
                                      value={task.task}
                                      onChange={(e) =>
                                        handleTaskChange(
                                          rowIndex,
                                          taskIndex,
                                          "task",
                                          e.target.value
                                        )
                                      }
                                      className="form-control"
                                      placeholder="Task"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      value={task.hours}
                                      onChange={(e) =>
                                        handleTaskChange(
                                          rowIndex,
                                          taskIndex,
                                          "hours",
                                          e.target.value
                                        )
                                      }
                                      className="form-control"
                                      placeholder="Hours"
                                    />
                                  </td>
                                  <td>
                                    <button
                                      onClick={() =>
                                        removeTaskFromRow(rowIndex, taskIndex)
                                      }
                                      className="btn btn-danger btn-sm"
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button onClick={addRow} className="btn btn-primary me-3">
                  + Add Row
                </button>
                <button onClick={handleSubmit} className="btn btn-success">
                <i className="mdi mdi-send me-2"></i> Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTimesheetForm;
