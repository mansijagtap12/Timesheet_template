import React, { useState } from "react";

const Dashboard = () => {
  // Define state for tasks and input field in the Dashboard component
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // Function to add a task
  const handleAddTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        id: Date.now(), // unique ID based on timestamp
        text: taskInput,
        completed: false,
      };
      setTasks([...tasks, newTask]); // Add task to the list
      setTaskInput(""); // Clear input after adding
    }
  };

  // Function to toggle task completion status
  const handleToggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to remove a task
  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white me-2">
              <i className="mdi mdi-home"></i>
            </span>
            Dashboard
          </h3>
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
                <span></span>Overview{" "}
                <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
              </li>
            </ul>
          </nav>
        </div>

        <div className="row">
          <DashboardCard
            className="bg-gradient-success"
            title="Total Employee"
            icon="mdi-chart-line"
            amount="100"
          />

          <DashboardCard
            className="bg-gradient-danger"
            title="AIA"
            icon="mdi-bookmark-outline"
            amount="15"
          />
          <DashboardCard
            className="bg-gradient-secondary"
            title="Amway"
            icon="mdi-diamond"
            amount="5"
            change="Increased by 5%"
          />
          <DashboardCard
            className="bg-gradient-info"
            title="bench"
            icon="mdi-diamond"
            amount="20"
          />
        </div>

        

        {/* Todo List Component */}
        <div className="row">
          {/* Todo List Section */}
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-dark">Todo List</h4>
                <div className="add-items d-flex">
                  <input
                    type="text"
                    className="form-control todo-list-input"
                    placeholder="What do you need to do today?"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                  />
                  <button
                    className="add btn btn-gradient-primary font-weight-bold todo-list-add-btn"
                    id="add-task"
                    onClick={handleAddTask}
                  >
                    {" "}
                    Add
                  </button>
                </div>
                <div className="list-wrapper">
                  <ul className="d-flex flex-column-reverse todo-list todo-list-custom">
                    {tasks.map((task) => (
                      <li
                        key={task.id}
                        className={task.completed ? "completed" : ""}
                      >
                        {" "}
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              className="checkbox"
                              type="checkbox"
                              checked={task.completed}
                              onChange={() =>
                                handleToggleTaskCompletion(task.id)
                              }
                            />
                            {task.text}
                          </label>
                        </div>
                        <i
                          className="remove mdi mdi-close-circle-outline"
                          onClick={() => handleRemoveTask(task.id)}
                        ></i>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
const DashboardCard = ({ className, title, icon, amount, change }) => (
  <div className="col-md-3 stretch-card grid-margin">
    <div className={`card ${className} card-img-holder text-white`}>
      
        <div className="card-body">
          <img
            src="assets/images/dashboard/circle.svg"
            className="card-img-absolute"
            alt="circle-image"
          />
          <h6 className="font-weight-normal mb-3">
            {title} <i className={`mdi ${icon} mdi-24px float-end`}></i>
          </h6>
          <h4 className="mb-2">{amount}</h4>
        </div>
   
    </div>
  </div>
);
// const RecentTickets = () => (
//   <div className="row">
//     <div className="col-12 grid-margin">
//       <div className="card">
//         <div className="card-body">
//           <h4 className="card-title">Recent Tickets</h4>
//           <div className="table-responsive">
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Assignee</th>
//                   <th>Subject</th>
//                   <th>Status</th>
//                   <th>Last Update</th>
//                   <th>Tracking ID</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Mansi Jagtap</td>
//                   <td>Fix Login Issue</td>
//                   <td>
//                     <div className="progress">
//                       <div
//                         className="progress-bar bg-success"
//                         role="progressbar"
//                         style={{ width: "55%" }}
//                         aria-valuenow="25"
//                         aria-valuemin="0"
//                         aria-valuemax="100"
//                       ></div>
//                     </div>
//                   </td>
//                   <td>2025-01-05</td>
//                   <td>#12345</td>
//                 </tr>
//                 <tr>
//                   <td>Dhiraj Saidane</td>
//                   <td>Resolve API Bug</td>
//                   <td>
//                     <div className="progress">
//                       <div
//                         className="progress-bar bg-danger"
//                         role="progressbar"
//                         style={{ width: "25%" }}
//                         aria-valuenow="25"
//                         aria-valuemin="0"
//                         aria-valuemax="100"
//                       ></div>
//                     </div>
//                   </td>
//                   <td>2025-01-03</td>
//                   <td>#12347</td>
//                 </tr>
//                 <tr>
//                   <td>Yogesh Pardeshi</td>
//                   <td>Enhance UI Design</td>
//                   <td>
//                     <div className="progress">
//                       <div
//                         className="progress-bar bg-warning"
//                         role="progressbar"
//                         style={{ width: "75%" }}
//                         aria-valuenow="25"
//                         aria-valuemin="0"
//                         aria-valuemax="100"
//                       ></div>
//                     </div>
//                   </td>
//                   <td>2025-01-02</td>
//                   <td>#12348</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

export default Dashboard;
