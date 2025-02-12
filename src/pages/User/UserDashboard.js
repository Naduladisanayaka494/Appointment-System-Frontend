import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import UserNavbar from "./UserNavbar";

function UserDashboard() {
  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

    const userId = localStorage.getItem("userId"); 
    console.log(selectedAppointment);

  useEffect(() => {
    loadTimeSlots();
    loadUserAppointments();
  }, []);

  const loadTimeSlots = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/slots/filter"
      );
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
    setLoading(false);
  };

const loadUserAppointments = async () => {
  setLoading(true);
  try {
    const response = await axios.get(
      `http://localhost:8080/api/appointments?userId=${userId}`
    );
    const filteredAppointments = response.data.filter(
      (appt) => !appt.cancelled
    ); 
    setAppointments(filteredAppointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
  setLoading(false);
};


  const bookAppointment = async (timeSlotId) => {
    try {
      await axios.post(
        `http://localhost:8080/api/appointments/book?userId=${userId}&timeSlotId=${timeSlotId}`
      );
      Swal.fire("Success", "Appointment booked successfully!", "success");
      loadTimeSlots();
      loadUserAppointments();
    } catch (error) {
      Swal.fire("Error", "Failed to book appointment.", "error");
    }
  };

  const viewAppointment = (appointment) => {
      setSelectedAppointment(appointment);  
      setModalShow(true);
    };
    

const cancelAppointment = async (appointmentId, timeSlotId) => {
  try {
    await axios.delete(
      `http://localhost:8080/api/appointments?appointmentId=${appointmentId}?timeSlotId=${timeSlotId}`
    );
    Swal.fire("Cancelled", "Appointment cancelled successfully.", "success");
    loadUserAppointments();
  } catch (error) {
    Swal.fire("Error", "Failed to cancel appointment.", "error");
  }
};

  return (
    <Container className="mt-4">
      <UserNavbar />
      <br />
      <br />
      <Row>
        <Col md={6}>
          <h3>Available Time Slots</h3>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Slot ID</th>
                  <th>Start Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot) => (
                  <tr key={slot.id}>
                    <td>{slot.id}</td>
                    <td>{slot.startTime}</td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => bookAppointment(slot.id)}
                      >
                        Book
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>

        <Col md={6}>
          <h3>Your Appointments</h3>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>Time Slot</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>{appt.id}</td>
                    <td>{appt.appointmentTime}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => viewAppointment(appt.id)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <p>
                <strong>Appointment ID:</strong> {selectedAppointment.id}
              </p>
              <p>
                <strong>Time Slot:</strong> {selectedAppointment.timeSlotId}
              </p>
              <Button
                variant="danger"
                onClick={() =>
                  cancelAppointment(
                    selectedAppointment.id,
                    selectedAppointment.user.id
                  )
                }
              >
                Cancel Appointment
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default UserDashboard;
