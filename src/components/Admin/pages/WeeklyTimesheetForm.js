import React, { useState, useEffect } from "react"; // For React hooks
import "bootstrap/dist/css/bootstrap.min.css"; // For Bootstrap styling
import Modal from "react-bootstrap/Modal"; // For Bootstrap Modal component
import { useTable } from "react-table"; // For react-table hook

const WeeklyTimesheetForm = () => {
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [subTasks, setSubTasks] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );

    const weekData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      return {
        date: date.toISOString().split("T")[0],
        day: dayName,
        project: "",
        totalHours: dayName === "Saturday" || dayName === "Sunday" ? 0 : 8, // Default weekend hours to 0
        tasks: [],
        exceeded: false,
        isWeekend: dayName === "Saturday" || dayName === "Sunday",
      };
    });

    setRows(weekData);
  }, []);

  const handleRowChange = (rowIndex, field, value) => {
    const updatedRows = [...rows];

    // Update the field value
    updatedRows[rowIndex][field] = value;

    // Check if the entered project is a type of leave
    const leaveTypes = [
      "Sick Leave",
      "Annual Leave",
      "Personal Leave",
      "Casual Leave",
    ];
    if (field === "project" && leaveTypes.includes(value)) {
      updatedRows[rowIndex].disabled = true;
      updatedRows[rowIndex].totalHours = 0; // Reset total hours for leave
      updatedRows[rowIndex].tasks = []; // Clear tasks if any
    } else if (field === "project") {
      updatedRows[rowIndex].disabled = false; // Re-enable if it's not a leave type
    }

    setRows(updatedRows);
  };

  const openTaskModal = (rowIndex) => {
    setActiveRowIndex(rowIndex);
    setSubTasks(rows[rowIndex].tasks);
    setShowModal(true);
  };

  const handleSubTaskChange = (taskIndex, field, value) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks[taskIndex][field] = value;
    setSubTasks(updatedSubTasks);
  };

  const addSubTask = () => {
    setSubTasks([...subTasks, { task: "", hours: "" }]);
  };

  const removeSubTask = (taskIndex) => {
    setSubTasks(subTasks.filter((_, index) => index !== taskIndex));
  };

  const saveSubTasks = () => {
    const updatedRows = [...rows];

    // Calculate total hours from the sub-tasks
    const totalSubTaskHours = subTasks.reduce(
      (total, task) => total + (parseFloat(task.hours) || 0),
      0
    );

    // Update the tasks and total hours in the active row
    updatedRows[activeRowIndex].tasks = subTasks;
    updatedRows[activeRowIndex].totalHours = totalSubTaskHours || 0;

    // Check if the total hours exceed 8 and mark it
    updatedRows[activeRowIndex].exceeded = totalSubTaskHours > 8;

    // Update the rows state
    setRows(updatedRows);
    setShowModal(false);
  };

  const handleSubmit = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Day",
        accessor: "day",
        Cell: ({ row }) => {
          const day = row.original.day; // Access the day value
          const isWeekend = day === "Saturday" || day === "Sunday"; // Check if it's a weekend
          return (
            <span
              style={{
                color: isWeekend ? "red" : "inherit", // Apply red color for weekends
              }}
            >
              {day}
            </span>
          );
        },
      },
      {
        Header: "Project",
        accessor: "project",
        Cell: ({ row }) => {
          const rowData = rows[row.index];
          const isWeekend = rowData.isWeekend; // Get weekend flag

          // Conditionally set the placeholder text and style based on the weekend
          return (
            <input
              type="text"
              className="form-control"
              placeholder={isWeekend ? "Weekend" : "Project"} // Change placeholder for weekends
              style={isWeekend ? { color: "red" } : {}}
            />
          );
        },
      },

      {
        Header: "Hours",
        accessor: "totalHours",
        Cell: ({ row }) => {
          const rowData = rows[row.index];
          const isExceeded = rowData.exceeded;

          return (
            <input
              type="number"
              value={rowData.totalHours}
              readOnly
              className={`form-control ${
                rowData.totalHours > 8 && !rowData.isWeekend
                  ? "bg-custom text-dark"
                  : rowData.totalHours < 8 && !rowData.isWeekend
                  ? "bg-danger text-white"
                  : ""
              }`}
            />
          );
        },
      },
      {
        Header: "Add Task",
        accessor: "Add Task",
        Cell: ({ row }) => (
          <i
            className="mdi mdi-folder-plus"
            onClick={() => openTaskModal(row.index)}
            style={{ cursor: "pointer" }}
          ></i>
        ),
      },
    ],
    [rows]
  );

  const data = React.useMemo(() => rows, [rows]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows: tableRows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="content-wrapper">
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div className="page-header">
              <h5 className="page-title">
                <span className="page-title-icon  text-dark me-2">
                  <i className="mdi mdi-pencil-box"></i>
                </span>
                Task Manager
              </h5>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Dashboard</a>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">
                    Task Manager
                  </li>
                </ol>
              </nav>
            </div>
            <hr />
            {showSuccessMessage && (
              <div className="alert alert-success" role="alert">
                <strong>Thank you!</strong> You have successfully submitted the {" "}
                Weekly timesheet.
              </div>
            )}

            <table
              {...getTableProps()}
              className="table table-bordered table-striped"
            >
              <thead className="table-secondary">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {tableRows.map((row) => {
                  prepareRow(row);
                  const rowData = rows[row.index];
                  const isDisabled = rowData.disabled;

                  return (
                    <tr
                      {...row.getRowProps()}
                      style={{
                        backgroundColor: isDisabled ? "lightgrey" : "white",
                        pointerEvents: isDisabled ? "none" : "auto", // Disable interaction for leave
                      }}
                    >
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>
                          {cell.column.id === "totalHours" && isDisabled ? (
                            // Show "N/A" for total hours if it's leave
                            <input
                              type="text"
                              value="N/A"
                              className="form-control"
                              readOnly
                            />
                          ) : (
                            cell.render("Cell")
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-end">
              <button onClick={handleSubmit} className="btn btn-primary">
                <i className="mdi mdi-send me-2"></i>Submit
              </button>
            </div>

            {/* SubTask Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Sub Tasks</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex justify-content-end">
                  <button onClick={addSubTask} className="btn btn-primary mb-1">
                    + Add Sub Task
                  </button>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Hours</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subTasks.map((task, taskIndex) => (
                      <tr key={taskIndex}>
                        <td>
                          <input
                            type="text"
                            value={task.task}
                            onChange={(e) =>
                              handleSubTaskChange(
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
                              handleSubTaskChange(
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
                            onClick={() => removeSubTask(taskIndex)}
                            className="btn btn-danger btn-sm"
                          >
                            <i className="mdi mdi-delete"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary" onClick={saveSubTasks}>
                  Save
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTimesheetForm;
