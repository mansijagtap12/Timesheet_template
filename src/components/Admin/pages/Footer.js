import React from "react";

const Footer = () => {
  return (
    <footer
      className="footer fixed-bottom"
      style={{ backgroundColor: "#f8f9fa", padding: "10px 20px" }}
    >
      <div className="d-sm-flex justify-content-center justify-content-sm-between">
        <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
          Copyright © 2024{" "}
          <a
            href="https://vkraftsoftware.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vkraft Software Services
          </a>
          . All rights reserved.
        </span>
        <span
          className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"
          style={{ color: "darkgray" }}
        >
          Hand-crafted & made with <i className="mdi mdi-heart text-danger"></i>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
