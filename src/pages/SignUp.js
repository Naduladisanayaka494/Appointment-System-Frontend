import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(
        err.response?.status === 406
          ? "Email already exists. Try another."
          : "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="shadow p-4 rounded bg-white w-50">
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <span
                className="text-primary"
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => navigate("/")}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
