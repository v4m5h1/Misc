import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import{FiDownload, FiUpload, RiGalleryView} from 'react-icons/fi'
import '../styles/HomePage.css'

const HomePage = () => {
    const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/form'); // Use navigate instead of history.push
  };


  return (
    <Container className="d-flex justify-content-center">
  <Row className="w-100">
    <Col className="text-center">
      <div className="step-counter topnav-wrapper">
        <div className="heading" style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
          <div className="app-title">Request Action to Perform</div>
        </div>
      </div>
      <div className="step-inner">
        <div className="wrapper">
          <div className="row ms-5">
            <div className="col-md-4">
              <div className="circle" onClick={handleButtonClick}>
                <i>Download</i> className="custom-icon" />
                <br />
                <span className="circle-text">Download</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="circle" onClick={handleButtonClick}>
                <i>Upload</i> className="custom-icon" />
                <p className="circle-text">Upload</p>
                <p>Coming Soon</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="circle" onClick={handleButtonClick}>
                <p className="circle-text">View All Requests</p>
                <p>Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
  </Row>
</Container>
  );
};

export default HomePage;
