import React from 'react';
import { Form } from 'react-bootstrap';

const ToggleSwitch = ({ id, label, checked, onChange }) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Switch
                id={id}
                checked={checked}
                onChange={onChange}
                label={checked ? "Yes" : "No"}
            />
        </Form.Group>
    );
};

export default ToggleSwitch;
