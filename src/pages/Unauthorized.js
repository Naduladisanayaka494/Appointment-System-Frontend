import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h1 className="text-danger mb-4">Access Denied</h1>
      <p className="mb-4 text-center">
        You are not authorized to access this page. Please contact your
        administrator if you believe this is an error.
      </p>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Go Back to Login
      </button>
    </div>
  );
};

export default Unauthorized;
