import React from 'react';
import { Form } from 'react-bootstrap';

const FormField = ({ label, type, value, onChange, error, placeholder, as = "input", options = [], ...props }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      {type === 'select' ? (
        <Form.Control as="select" value={value} onChange={onChange} isInvalid={!!error} {...props}>
          <option value="">Select an option...</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </Form.Control>
      ) : (
        <Form.Control
          as={as}
          type={type}
          value={value}
          onChange={onChange}
          isInvalid={!!error}
          placeholder={placeholder}
          {...props}
        />
      )}
      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormField;