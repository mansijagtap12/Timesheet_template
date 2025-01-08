import React from "react";

const EmployeeList = () => {
  return (
    <div className="content-wrapper">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="mdi mdi-format-align-justify"></i>
                </span>
                Employee Record
              </h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="/">Dashboard</a>
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
