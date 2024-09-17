import React from 'react';
import { Form } from 'react-bootstrap';

const RadioButtonGroup = ({ options, name, selectedValue, onChange, error }) => {
  return (
    <Form.Group>
      {options.map((option, index) => (
        <Form.Check
          key={index}
          type="radio"
          id={`${option.value}Radio`}
          label={option.label}
          name={name}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={onChange}
          isInvalid={!!error}
        />
      ))}
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default RadioButtonGroup;
