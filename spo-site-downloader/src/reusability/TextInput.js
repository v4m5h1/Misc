import React from 'react';

const TextInput = ({ label, name, value, placeholder, onChange, errors, disabled }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`form-control ${errors ? 'is-invalid' : ''}`}
      />
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
};

export default TextInput;
