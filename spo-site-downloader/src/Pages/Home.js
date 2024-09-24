import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/form'); // Use navigate instead of history.pu
  };


  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col className="text-center">
          <h1>Welcome to the Home Page</h1>
          <Button
            variant="primary"
            size="lg"
            onClick={handleButtonClick}
          >
            Go to Form Page
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
