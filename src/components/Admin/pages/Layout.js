// Layout.js
import React, { memo } from "react";
import Navbar from "./Navbar"; // Adjust path based on your structure
import Sidebar from "./Sidebar"; // Adjust path based on your structure

// Memoize to prevent re-rendering unless props change
const MemoizedNavbar = memo(Navbar);
const MemoizedSidebar = memo(Sidebar);

const Layout = ({ children }) => {
  return (
    <>
      <MemoizedNavbar />
      <div className="container-fluid page-body-wrapper">
        <MemoizedSidebar />
        {children} {/* Only this part will re-render */}
      </div>
    </>
  );
};

export default Layout;