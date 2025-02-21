import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  console.log("Auth Status:", isAuthenticated); // Debugging

  // Ensure isAuthenticated is explicitly set to "true"
  if (isAuthenticated !== 'true') {
    console.log("Redirecting to login...");
    return <Navigate to="/" replace />;
  }

  console.log("Access granted to protected route");
  return children;
};

export default ProtectedRoute;
