import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  FaHome,
  FaLink,
  MdOutlineAssignment,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";

function AdminNavbar() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "ADMIN") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-primary text-white shadow-lg">
      <Container>
        <Navbar.Brand href="/Admin-Dasboard" className="fw-bold text-white">
          Admin Panel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link
              href="/Event-dashboard"
              className="text-white fw-semibold d-flex align-items-center py-2 px-3"
            >
              <FaHome className="me-2" size={20} />
              Event-Details
            </Nav.Link> */}
            <Nav.Link
              href="/Time-Slot"
              className="text-white fw-semibold d-flex align-items-center py-2 px-3"
            >
              <FaSignInAlt className="me-2" size={20} />
              Create-Time-Slots
            </Nav.Link>
            <Nav.Link
              href="/Admin-Appontments"
              className="text-white fw-semibold d-flex align-items-center py-2 px-3"
            >
              <FaLink className="me-2" size={20} />
              Appointment-Details
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              onClick={handleLogout}
              className="btn btn-outline-light text-dark d-flex align-items-center py-2 px-3"
              style={{ cursor: "pointer" }}
            >
              <FaSignOutAlt className="me-2" size={20} />
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
