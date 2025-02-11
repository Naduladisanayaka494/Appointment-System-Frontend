import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Container, Row, Col, Form } from "react-bootstrap";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import AdminNavbar from "./AdminNavbar";

function AdminDashboard() {
  

  return (
    <Container id="dashboard-content" className="mt-4">
      <div>
              <AdminNavbar />
              <br />
              <h1>This is Admin panel</h1>
      </div>
    </Container>
  );
}

export default AdminDashboard;
