import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

import { motion } from "framer-motion"; // Import framer-motion
import UserNavbar from "./UserNavbar";

function UserDashboard() {


  
  return (
    <Container id="dashboard-content" className="mt-4">
      <UserNavbar />
      <br />

      <h1>User Dashboard</h1>
    </Container>
  );
}

export default UserDashboard;
