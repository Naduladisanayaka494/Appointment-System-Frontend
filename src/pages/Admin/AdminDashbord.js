import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FaUsers, FaCalendarCheck, FaCheckCircle } from "react-icons/fa";

function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [bookedSlots, setBookedSlots] = useState(0);
  const [totalSlots, setTotalSlots] = useState(0);
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

      const slotResponse = await axios.get(
        "http://localhost:8080/api/slots/filter"
      );
      const booked = slotResponse.data.filter((slot) => slot.isBooked).length;
      setBookedSlots(booked);
      setTotalSlots(slotResponse.data.length);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
    setLoading(false);
  };

  const stats = [
    {
      title: "Total Users",
      value: userCount,
      color: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      icon: <FaUsers size={40} />,
    },
    {
      title: "Total Appointments",
      value: appointmentCount,
      color: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
      icon: <FaCalendarCheck size={40} />,
    },
    {
      title: "Booked vs Available Slots",
      value: `${bookedSlots} / ${totalSlots}`,
      color: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
      icon: <FaCheckCircle size={40} />,
    },
  ];

  return (
    <Container className="mt-4">
      <AdminNavbar />
      <Row className="mt-4">
        {stats.map((stat, index) => (
          <Col sm={12} md={6} lg={4} key={index} className="mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="text-center shadow-lg border-0"
                style={{
                  background: stat.color,
                  color: "white",
                  borderRadius: "15px",
                }}
              >
                <Card.Body>
                  <div className="mb-3">{stat.icon}</div>
                  <Card.Title className="fw-bold">{stat.title}</Card.Title>
                  <Card.Text className="fs-3">
                    {loading ? <Spinner animation="border" /> : stat.value}
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AdminDashboard;
