import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa"; // For Facebook and Instagram icons
import { Container, Row, Col } from "react-bootstrap"; // Bootstrap grid system

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <h5>Appointment Booking System</h5>
            <p>
              Providing the best service for your appointments. Book easily and
              manage your time.
            </p>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: info@example.com</li>
              <li>Phone: +123 456 7890</li>
            </ul>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mr-3"
              >
                <FaFacebook size={30} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <FaInstagram size={30} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="text-center py-3">
        <p>&copy; 2025 Appointment Booking System. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
