import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import eventImage from "../images/event2.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex flex-column flex-lg-row vh-100">
      <nav
        className="bg-dark text-white d-flex flex-column align-items-center justify-content-center p-4"
        style={{ flex: "1" }}
      >
        <h2 className="mb-4 text-center">Appointment-Booking-system</h2>
        <img
          src={eventImage}
          alt="Event"
          style={{ width: "80%", borderRadius: "20px" }}
          className="mb-4"
        />
        <p className="text-center">
          Welcome to the Appointment Booking System System!
        </p>
      </nav>
      <div
        className="d-flex justify-content-center align-items-center bg-light"
        style={{ flex: "1" }}
      >
        <div className="w-75">
          <h2 className="text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {/* <form onSubmit={handleLogin} className="shadow p-4 rounded bg-white">
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
              Login
            </button>
          </form> */}
          <form onSubmit={handleLogin} className="shadow p-4 rounded bg-white">
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
              Login
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-3">
              <p>
                Don't have an account?{" "}
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
