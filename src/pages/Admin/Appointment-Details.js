import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { saveAs } from "file-saver";
import AdminNavbar from "./AdminNavbar";

const AppointmentFilterAdmin = () => {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCancelled, setIsCancelled] = useState("");

  useEffect(() => {
    fetchAppointments();
    fetchUsers();
  }, []);

  const fetchAppointments = async (params = {}) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/appointments/filter",
        { params }
      );
      setAppointments(response.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch appointments", "error");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/auth/users");
      setUsers(response.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch users", "error");
    }
  };

  const handleFilter = () => {
    const params = {};
    if (selectedUser) params.userId = selectedUser;
    if (startDate) params.startDate = startDate.toISOString();
    if (endDate) params.endDate = endDate.toISOString();
    if (isCancelled !== "") params.isCancelled = isCancelled;

    fetchAppointments(params);
  };

  const handleDownloadReport = () => {
    const csvData = appointments.map((appt) => {
      return `${appt.id},${appt.user.name},${appt.date},${
        appt.isCancelled ? "Cancelled" : "Active"
      }`;
    });
    const csvContent = `ID,User,Date,Status\n` + csvData.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    saveAs(blob, "appointments_report.csv");
  };

  return (
    <div className="container mt-4">
      <AdminNavbar />
      <h2 className="text-center">Filter Appointments</h2>
      <div className="d-flex justify-content-center mb-3">
        <Form.Select
          className="me-2"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Form.Select>
        <DatePicker
          selected={startDate}
          onChange={setStartDate}
          className="form-control me-2"
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={setEndDate}
          className="form-control me-2"
          placeholderText="End Date"
        />
        <Form.Select
          className="me-2"
          value={isCancelled}
          onChange={(e) => setIsCancelled(e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Cancelled</option>
          <option value="false">Active</option>
        </Form.Select>
        <Button onClick={handleFilter} className="ms-2">
          Filter
        </Button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.id}</td>
                <td>{appt.user.name}</td>
                <td>{new Date(appt.appointmentTime).toLocaleString()}</td>
                <td>{appt.isCancelled ? "Cancelled" : "Active"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No appointments found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="text-center">
        <Button onClick={handleDownloadReport} variant="success">
          Download Report
        </Button>
      </div>
    </div>
  );
};

export default AppointmentFilterAdmin;
