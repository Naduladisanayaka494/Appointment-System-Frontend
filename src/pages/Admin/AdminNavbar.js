import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
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
    <Navbar expand="lg" className="bg-white text-dark shadow-lg">
      <Container>
        <Navbar.Brand href="/admindashboard" className="fw-bold text-dark">
          Admin Panel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Event-dashboard" className="text-dark fw-semibold">
              <FaHome className="me-2" /> Event-Details
            </Nav.Link>
            <Nav.Link href="/event-handling" className="text-dark fw-semibold">
              <FaLink className="me-2" /> Event-Handeling
            </Nav.Link>
            <Nav.Link href="/signup" className="text-dark fw-semibold">
              <FaSignInAlt className="me-2" /> Create-DataEnty-User
            </Nav.Link>
            {/* <Nav.Link href="#link" className="text-dark fw-semibold">
              <FaLink className="me-2" /> Link
            </Nav.Link> */}
            {/* <NavDropdown
              title="Actions"
              id="basic-nav-dropdown"
              className="text-dark"
            >
              <NavDropdown.Item href="#action/3.1">Action 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            <Nav.Link
              onClick={handleLogout}
              className="btn btn-outline-light text-dark d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
