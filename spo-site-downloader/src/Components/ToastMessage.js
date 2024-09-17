import React from 'react';
import { Toast } from 'react-bootstrap';

const ToastMessage = ({ show, onClose, message }) => {
  return (
    <Toast onClose={onClose} show={show} delay={3000} autohide position="top-end" style={{ position: 'fixed', top: 20, right: 20 }}>

      <Toast.Header>
        <strong className="me-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default ToastMessage;
