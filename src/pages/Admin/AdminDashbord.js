import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";
import { motion } from "framer-motion"; // Import framer-motion

function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [bookedSlots, setBookedSlots] = useState(0);
  const [totalSlots, setTotalSlots] = useState(0);
  const [latestAppointment, setLatestAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const userResponse = await axios.get(
        "http://localhost:8080/api/auth/users"
      );
      setUserCount(userResponse.data.length);

      const appointmentResponse = await axios.get(
        "http://localhost:8080/api/appointments/all"
      );
      setAppointmentCount(appointmentResponse.data.length);

      const slotResponse = await axios.get("http://localhost:8080/api/slots/filter");
      const booked = slotResponse.data.filter((slot) => slot.isBooked).length;
      setBookedSlots(booked);
      setTotalSlots(slotResponse.data.length);

      if (appointmentResponse.data.length > 0) {
        const latest = appointmentResponse.data[0];
        setLatestAppointment(latest);
      }
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
    setLoading(false);
  };

  return (
    <Container id="dashboard-content" className="mt-4">
      <AdminNavbar />
      <br />

      <Row className="mt-4">
        <Col sm={12} md={6} lg={6} className="mb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className="text-center shadow-lg border-0"
              style={{ backgroundColor: "#4CAF50", color: "white" }}
            >
              <Card.Body>
                <Card.Title>Total Users</Card.Title>
                <Card.Text>
                  {loading ? <Spinner animation="border" /> : userCount}
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col sm={12} md={6} lg={6} className="mb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className="text-center shadow-lg border-0"
              style={{ backgroundColor: "#FF5722", color: "white" }}
            >
              <Card.Body>
                <Card.Title>Total Appointments</Card.Title>
                <Card.Text>
                  {loading ? <Spinner animation="border" /> : appointmentCount}
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col sm={12} md={6} lg={6} className="mb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className="text-center shadow-lg border-0"
              style={{ backgroundColor: "#2196F3", color: "white" }}
            >
              <Card.Body>
                <Card.Title>Booked vs Available Slots</Card.Title>
                <Card.Text>
                  {loading ? (
                    <Spinner animation="border" />
                  ) : (
                    <>
                      <strong>Booked:</strong> {bookedSlots} <br />
                      <strong>Available:</strong> {totalSlots - bookedSlots}
                    </>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col sm={12} md={6} lg={6} className="mb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className="text-center shadow-lg border-0"
              style={{ backgroundColor: "#9C27B0", color: "white" }}
            >
              <Card.Body>
                <Card.Title>Latest Appointment</Card.Title>
                <Card.Text>
                  {loading ? (
                    <Spinner animation="border" />
                  ) : latestAppointment ? (
                    <>
                      <strong>User:</strong> {latestAppointment.userName} <br />
                      <strong>Time:</strong> {latestAppointment.startTime}
                    </>
                  ) : (
                    "No appointments yet."
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
