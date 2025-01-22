import React from "react";
import { FaEdit, FaTrash } from 'react-icons/fa'; // FontAwesome icons for Edit and Trash

const EmployeeList = () => {
  // Handle Edit action
  const handleEdit = (employeeId) => {
    alert(`Edit employee with ID: ${employeeId}`);
    // Add your edit logic here (e.g., opening a modal to edit employee details)
  };

  // Handle Delete action
  const handleDelete = (employeeId) => {
    console.log(`Delete employee with ID: ${employeeId}`);
    // Add your delete logic here (e.g., confirming deletion and removing employee from the list)
  };



  return (
    <div className="content-wrapper">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon  text-dark me-2">
                  <i className="mdi mdi-format-align-justify"></i>
                </span>
                Employee Record
              </h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="/dashboard">Dashboard</a>
                  </li>
                  <li class="breadcrumb-item ">
                    <a href="/Employee-Registration-Form">Add Employee</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Employee List
                  </li>
                </ol>
              </nav>
            </div>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th> User </th>
                  <th> Name </th>
                  <th> Project </th>
                  <th> RM </th>
                  <th> Certification </th>
                  <th> Skills </th>
                  <th> Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1">
                    <img
                      src="../../assets/images/faces-clipart/pic-2.png"
                      alt="image"
                    />
                  </td>
                  <td> Mansi jagtap </td>
                  <td>Airflow</td>
                  <td> Riya </td>
                  <td> SQL , JAVA </td>
                  <td> UI / UX </td>
                  <td>
                    <button
                    
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => handleEdit(1)} // Pass employee ID or index
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm me-2"
                      onClick={() => handleDelete(1)} // Pass employee ID or index
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-1">
                    <img
                      src="../../assets/images/faces-clipart/pic-3.png"
                      alt="image"
                    />
                  </td>
                  <td>Riya Ganore </td>
                  <td>Airflow</td>
                  <td> Gowtham </td>
                  <td> Devops </td>
                  <td>python </td>
                  <td>
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => handleEdit(1)} // Pass employee ID or index
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm me-2"
                      onClick={() => handleDelete(1)} // Pass employee ID or index
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-1">
                    <img
                      src="../../assets/images/faces-clipart/pic-1.png"
                      alt="image"
                    />
                  </td>
                  <td> Ram Chowdhary </td>
                  <td>AIA</td>
                  <td> Mahendra </td>
                  <td> SQL , JAVA </td>
                  <td> Webmethod </td>
                  <td>
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => handleEdit(1)} // Pass employee ID or index
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm me-2"
                      onClick={() => handleDelete(1)} // Pass employee ID or index
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="py-1">
                    <img
                      src="../../assets/images/faces-clipart/pic-3.png"
                      alt="image"
                    />
                  </td>
                  <td> Sakshi Aher </td>
                  <td>Webmethod Trainee</td>
                  <td> Mahendra </td>
                  <td> Ui/Ux </td>
                  <td> Webmethod / CamelK </td>
                  <td>
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => handleEdit(1)} // Pass employee ID or index
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm me-2"
                      onClick={() => handleDelete(1)} // Pass employee ID or index
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>{" "}
                <tr>
                  <td className="py-1">
                    <img
                      src="../../assets/images/faces-clipart/pic-4.png"
                      alt="image"
                    />
                  </td>
                  <td> Sai Krishna </td>
                  <td>AIA+</td>
                  <td> Mahendra </td>
                  <td> Kafka </td>
                  <td> Webmethod </td>
                  <td>
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => handleEdit(1)} // Pass employee ID or index
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm me-2"
                      onClick={() => handleDelete(1)} // Pass employee ID or index
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-1">
                    <img
                      src="../../assets/images/faces-clipart/pic-2.png"
                      alt="image"
                    />
                  </td>
                  <td> Vaibhavi </td>
                  <td>WABA</td>
                  <td> Subhash </td>
                  <td> SQL , JAVA </td>
                  <td> Java </td>
                  <td>
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => handleEdit(1)} // Pass employee ID or index
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm me-2"
                      onClick={() => handleDelete(1)} // Pass employee ID or index
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-1">
                    <img
                      src="../../assets/images/faces-clipart/pic-3.png"
                      alt="image"
                    />
                  </td>
                  <td> gayatri Borse </td>
                  <td>Insurance hub</td>
                  <td> Riya </td>
                  <td> SQL , JAVA </td>
                  <td> Wordpress </td>
                  <td>
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => handleEdit(1)} // Pass employee ID or index
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm me-2"
                      onClick={() => handleDelete(1)} // Pass employee ID or index
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-1">
                    <img
                      src="../../assets/images/faces-clipart/pic-4.png"
                      alt="image"
                    />
                  </td>
                  <td> Sagar Wankhede </td>
                  <td>WABA</td>
                  <td> Subhash </td>
                  <td> SQL , JAVA </td>
                  <td> java </td>
                  <td>
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => handleEdit(1)} // Pass employee ID or index
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm me-2"
                      onClick={() => handleDelete(1)} // Pass employee ID or index
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
