import React from 'react';
import TextInput from './TextInput';  // Adjust this path as necessary

const FormGroupAssets = ({ groups, handleGroupChange, errors, isEnabled }) => {
  return (
    <>
      {groups.map((group, index) => (
        <div key={index} className="mb-3">
          <TextInput
            label="Enter Library or list or folder name"
            name={`relativeURL${index}`}
            value={group.relativeURL}
            placeholder="Enter relative URL for library to download"
            onChange={e => handleGroupChange(index, e)}
            errors={errors && errors[`relativeURL${index}`] ? errors[`relativeURL${index}`] : ''}  // Ensure error is string
            disabled={!isEnabled}
          />
          <TextInput
            name={`relativeURLName${index}`}
            value={group.relativeURLName}
            placeholder="Enter relative URL name"
            onChange={e => handleGroupChange(index, e)}
            errors={errors && errors[`relativeURLName${index}`] ? errors[`relativeURLName${index}`] : ''}  // Ensure error is string
            disabled={!isEnabled}
          />
        </div>
      ))}
    </>
  );
};

export default FormGroupAssets;
