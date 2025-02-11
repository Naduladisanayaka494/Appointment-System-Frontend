import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import { FaCalendarPlus, FaFilter, FaFilePdf } from "react-icons/fa";
import moment from "moment";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AdminNavbar from "./AdminNavbar";

function TimeSlotPage() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isBooked, setIsBooked] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTimeSlots();
  }, []);
    
      const createTimeSlot = async () => {
        if (newStartTime) {
          try {
            const formattedStartTime = moment(newStartTime)
              .local()
              .format("YYYY-MM-DDTHH:mm:ss");

            await axios.post("http://localhost:8080/api/slots/create", null, {
              params: { startTime: formattedStartTime },
            });

            setShowModal(false);
            Swal.fire("Success", "Time slot created successfully!", "success");
            fetchTimeSlots();
          } catch (error) {
            console.error("Error creating time slot:", error);
            Swal.fire("Error", "Failed to create time slot.", "error");
          }
        }
      };

  const fetchTimeSlots = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/slots/filter",
        {
          params: {
            startDate: startDate
              ? moment(startDate).local().format("YYYY-MM-DDTHH:mm:ss")
              : "",
            endDate: endDate
              ? moment(endDate).local().format("YYYY-MM-DDTHH:mm:ss")
              : "",
            isBooked: isBooked !== "" ? isBooked : undefined,
          },
        }
      );
      setTimeSlots(response.data);
    } catch (error) {
      console.error("Error fetching time slots:", error);
      Swal.fire("Error", "Failed to fetch time slots.", "error");
    }
    setLoading(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Appointment Time Slots Report", 14, 10);
    doc.autoTable({
      head: [["Start Time", "Is Booked"]],
      body: timeSlots.map((slot) => [
        moment(slot.startTime).format("YYYY-MM-DD HH:mm"),
        slot.isBooked ? "Yes" : "No",
      ]),
    });
    doc.save("TimeSlotsReport.pdf");
  };

  return (
    <Container>
      <AdminNavbar />
      <br />
      <br />
      <Row className="my-4">
        <Col>
          <h2>Appointment Time Slots</h2>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <FaCalendarPlus /> Create Time Slot
          </Button>
        </Col>
        <Col className="text-end">
          <Button variant="info" onClick={() => setFilterModal(true)}>
            <FaFilter /> Filter
          </Button>
          <Button variant="danger" className="ms-2" onClick={downloadPDF}>
            <FaFilePdf /> Download PDF
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Start Time</th>
                <th>Is Booked</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="2" className="text-center">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </td>
                </tr>
              ) : timeSlots.length > 0 ? (
                timeSlots.map((slot) => (
                  <tr key={slot.id}>
                    <td>{moment(slot.startTime).format("YYYY-MM-DD HH:mm")}</td>
                    <td>{slot.isBooked ? "Yes" : "No"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    No time slots found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Time Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newStartTime}
                onChange={(e) => setNewStartTime(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={createTimeSlot}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={filterModal} onHide={() => setFilterModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Time Slots</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formIsBooked">
              <Form.Label>Is Booked</Form.Label>
              <Form.Select
                value={isBooked}
                onChange={(e) => setIsBooked(e.target.value)}
              >
                <option value="">All</option>
                <option value="true">Booked</option>
                <option value="false">Not Booked</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setFilterModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={fetchTimeSlots}>
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TimeSlotPage;
