import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DataGridComponent from "./DataGrid";
import apiConfig from "../config/apiConfig";

const AllRequests = () => {
  const apiEndPoint = `${apiConfig.baseUrl}${apiConfig.endpoints.getRequestsByCurrentUser}`;

  return (
    <div>
      <DataGridComponent endPoint={apiEndPoint} title="Requests Submitted by you" />
    </div>
  );
};

export default AllRequests;