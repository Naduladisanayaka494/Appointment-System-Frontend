import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaLink,
  MdOutlineAssignment,
  FaSignOutAlt,
} from "react-icons/fa";

function UserNavbar() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "DataEntry") {
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
        <Navbar.Brand href="/Event-dashboard" className="fw-bold text-dark">
          DATAENTRY Panel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/add-atendee" className="text-dark fw-semibold">
              <FaHome className="me-2" /> ADD-ATTENDIES
            </Nav.Link>
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

export default UserNavbar;
