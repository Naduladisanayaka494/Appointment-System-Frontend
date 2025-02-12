import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Spinner, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import UserNavbar from "./UserNavbar";
import jsPDF from "jspdf";

function UserDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const slotsResponse = await axios.get(
        "http://localhost:8080/api/slots/filter"
      );
      const appointmentsResponse = await axios.get(
        `http://localhost:8080/api/appointments?userId=${userId}`
      );
      const filteredAppointments = appointmentsResponse.data.filter(
        (appt) => !appt.cancelled
      );

      const combinedData = slotsResponse.data.map((slot) => {
        const appointment = filteredAppointments.find(
          (appt) => appt.appointmentTime === slot.startTime
        );
        return {
          slotId: slot.id,
          startTime: slot.startTime,
          appointmentId: appointment ? appointment.id : null,
        };
      });
      setData(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const bookAppointment = async (timeSlotId) => {
    try {
      await axios.post(
        `http://localhost:8080/api/appointments/book?userId=${userId}&timeSlotId=${timeSlotId}`
      );
      Swal.fire("Success", "Appointment booked successfully!", "success");
      fetchData();
    } catch (error) {
      Swal.fire("Error", "Failed to book appointment.", "error");
    }
  };

  const viewAppointment = async (appointmentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/appointments/${appointmentId}`
      );
      setSelectedAppointment(response.data);
      setShowModal(true);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch appointment details.", "error");
    }
  };

const downloadAppointment = () => {
  if (!selectedAppointment) return;

  const doc = new jsPDF();

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Appointment Details", 105, 20, null, null, "center");

  // Draw a border for the details section
  doc.rect(15, 30, 180, 70); // x, y, width, height

  // Set font for details
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  // Appointment Details
  let y = 40;
  const lineSpacing = 10;
  const details = [
    { label: "Appointment ID", value: selectedAppointment.id },
    { label: "Name", value: selectedAppointment.user.name },
    { label: "Email", value: selectedAppointment.user.email },
    { label: "User ID", value: selectedAppointment.user.id },
    { label: "Appointment Time", value: selectedAppointment.appointmentTime },
  ];

  details.forEach((detail) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${detail.label}:`, 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(detail.value.toString(), 70, y);
    y += lineSpacing;
  });

  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Thank you for using our service!",
    105,
    y + 15,
    null,
    null,
    "center"
  );


  doc.save(`appointment_${selectedAppointment.id}.pdf`);
};
  const cancelAppointment = async () => {
    if (!selectedAppointment) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/appointments?appointmentId=${selectedAppointment.id}&timeSlotId=${selectedAppointment.user.id}`
      );
      Swal.fire("Success", "Appointment cancelled successfully!", "success");
      setShowModal(false);
      fetchData();
    } catch (error) {
      Swal.fire("Error", "Failed to cancel appointment.", "error");
    }
  };

  return (
    <Container className="mt-4">
          <UserNavbar />
          <br />
          <br/>
      <h3 className="text-center text-primary mb-4">
        Available Time Slots & Your Appointments
      </h3>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" size="lg" />
        </div>
      ) : (
        <Table striped bordered hover responsive className="text-center">
          <thead className="bg-info text-white">
            <tr>
              <th>Slot ID</th>
              <th>Start Time</th>
              <th>Appointment ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.slotId}>
                <td>{item.slotId}</td>
                <td>{item.startTime}</td>
                <td>{item.appointmentId || "-"}</td>
                <td>
                  {!item.appointmentId ? (
                    <Button
                      variant="success"
                      onClick={() => bookAppointment(item.slotId)}
                    >
                      Book
                    </Button>
                  ) : (
                    <Button
                      variant="info"
                      onClick={() => viewAppointment(item.appointmentId)}
                    >
                      View
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment ? (
            <div>
              <p>
                <strong>Appointment ID:</strong> {selectedAppointment.id}
              </p>
              <p>
                <strong>Appointment Name:</strong> {selectedAppointment.user.name}
              </p>
              <p>
                <strong>Appointment Email:</strong> {selectedAppointment.user.email}
              </p>
              <p>
                <strong>User ID:</strong> {selectedAppointment.user.id}
              </p>
              <p>
                <strong>Appointment Time:</strong>{" "}
                {selectedAppointment.appointmentTime}
              </p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={cancelAppointment}>
            Cancel Appointment
          </Button>
          <Button variant="primary" onClick={downloadAppointment}>
            Download
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default UserDashboard;
