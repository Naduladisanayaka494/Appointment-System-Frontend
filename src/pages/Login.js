import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import eventImage from "../images/event2.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );
      const { jwt, userRole, userId } = response.data;

      localStorage.setItem("token", jwt);
      localStorage.setItem("role", userRole);
      localStorage.setItem("userId", userId);

      login(jwt, userRole, userId);
      Swal.fire("Success!", "Logged in successfully!", "success");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      Swal.fire("Error", "Invalid email or password!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column flex-lg-row vh-100">
      {/* Left Section */}
      <nav className="bg-dark text-white d-flex flex-column align-items-center justify-content-center p-4 w-100 w-lg-50">
        <h2 className="mb-4 text-center">Appointment-Booking-System</h2>
        <img
          src={eventImage}
          alt="Event"
          className="mb-4 img-fluid rounded"
          style={{ maxWidth: "80%" }}
        />
        <p className="text-center">
          Welcome to the Appointment Booking System!
        </p>
      </nav>
      {/* Right Section */}
      <div className="d-flex justify-content-center align-items-center bg-light w-100 w-lg-50 p-4">
        <div
          className="shadow p-4 rounded bg-white w-100"
          style={{ maxWidth: "400px" }}
        >
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
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
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Login"
              )}
            </button>
            <div className="text-center mt-3">
              <p>
                Don't have an account?
                <span
                  className="text-primary"
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
