import React from "react";

const UserProfile = () => {
  return (
    <div className="content-wrapper">
    <div className="container-fluid ">
      <div className="row justify-content-center" >
        <div className="col-12 col-lg-12 bg-white shadow-lg rounded p-4 d-flex">
          {/* Left Side - Profile and Personal Info */}
          <div className="col-12 col-md-4 text-center p-4 border-end">
            <img
              src="../../assets/images/emp/yashwanth.jpg"
              alt="Profile"
              style={{
                height: "25%",
                width: "45%",
                borderRadius: "50%",
                transform: "translateZ(0) scale(1.05)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")} // Add zoom effect on hover
              onMouseOut={(e) => (e.target.style.transform = "scale(1.05)")} // Reset zoom when hover is removed
            />

            <h2 className="h4 font-weight-bold">Saikumar M</h2>
            <p className="text-muted">Project Manager</p>

            <div className="d-flex align-items-right" style={{marginLeft:"20px"}}>
              <label
                htmlFor="file-upload"
                className="btn btn-outline-success d-flex align-items-center"
              >
                <i className="mdi mdi-upload me-2">Profile</i>
              </label>
              <input
                type="file"
                id="file-upload"
                className="form-control d-none"
                style={{ display: "none" }}
              />
              &nbsp; &nbsp;
              <label
                htmlFor="file-upload"
                className="btn btn-outline-success d-flex align-items-center"
              >
                <i className="mdi mdi-upload me-2">Resume</i>
              </label>
              <input
                type="file"
                id="file-upload"
                className="form-control d-none"
                style={{ display: "none" }}
              />
            </div>

            <ul className="mt-4 text-muted small">
              <li>DevOps</li>
              <li>Webmethod</li>
              <li>Java</li>
            </ul>
          </div>

          {/* Right Side - Employee Account Details */}
          <div className="col-12 col-md-8 p-4">
            <h3 className="h5 font-weight-bold mb-4">Account Details</h3>
            <div className="row">
              {/* First Name */}
              <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value="Saikumar"
                    readOnly
                  />
                  <label htmlFor="firstName">
                   
                    First Name
                  </label>
                </div>
              </div>

              {/* Last Name */}
              <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value="M"
                    readOnly
                  />
                  <label htmlFor="lastName">
                    
                    Last Name
                  </label>
                </div>
              </div>

              {/* Email */}
              <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value="saikumars@example.com"
                    readOnly
                  />
                  <label htmlFor="email">
                    
                    Email
                  </label>
                </div>
              </div>

              {/* Phone No */}
              <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNo"
                    value="9867238723"
                    placeholder="Phone No"
                  />
                  <label htmlFor="phoneNo">
                    
                    Phone No
                  </label>
                </div>
              </div>

              {/* Work Location */}
              <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="workLocation"
                    placeholder="Work Location"
                    value="Nashik"
                  />
                  <label htmlFor="workLocation">
                   
                    Work Location
                  </label>
                </div>
              </div>

              {/* Skills */}
              <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="skills"
                    placeholder="Skills"
                    value="DevOps"
                  />
                  <label htmlFor="skills">
                    
                    Skills
                  </label>
                </div>
              </div>

              {/* Certification */}
              <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="certification"
                    placeholder="Certification"
                    value="DevOps"
                  />
                  <label htmlFor="certification">
                    
                    Certification
                  </label>
                </div>
              </div>
               {/* Password */}
               <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="Password"
                    placeholder="Password"
                  />
                  <label htmlFor="Password">
                    
                    Password
                  </label>
                </div>
              </div>
               <div className="col-md-6 mb-3">
                
              </div>
               <div className="col-md-6 mb-3 d-flex justify-content-end">
                <button className="btn btn-primary">Update</button>
              </div>

           
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
