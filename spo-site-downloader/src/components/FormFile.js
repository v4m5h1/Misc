import React, { useState } from "react";
import { Form, Container, Button, Toast, Spinner } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const FormFile = () => {
  const [formData, setFormData] = useState({
    siteURL: "",
    selection: "",
    downloadLocation: "",
    comment: "",
    formGroups: [{ relativeURL: "", relativeURLName: "" }],
    zipChecked: false,
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState({ success: false, message: '' });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  };

  const handleGroupChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      formGroups: prevData.formGroups.map((group, i) =>
        i === index ? { ...group, [name]: value } : group
      ),
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateForm = () => {
    debugger;
    const newErrors = {};
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    if (!formData.siteURL.trim()) {
        newErrors.siteURL = "Site URL is required.";
    } else if (!urlPattern.test(formData.siteURL.trim())) {
        newErrors.siteURL = "Please provide a valid URL.";
    }


    if (!formData.selection.trim()) newErrors.selection = "Asset selection is required.";
    if (!formData.downloadLocation.trim()) newErrors.downloadLocation = "Download location is required.";
    if (formData.selection === "List" || formData.selection === "Folder" || formData.selection === "Library") {

      formData.formGroups.forEach((group, index) => {
        if (!group.relativeURL.trim()) newErrors[`relativeURL${index}`] = "Relative URL is required.";
        if (!group.relativeURLName.trim()) newErrors[`relativeURLName${index}`] = "Relative URL Name is required.";
      });
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    if (!validateForm()) {
      setToastMessage('Validation failed, please fill all required fields.');
      setShowToast(true);
      return; // Stop submission if validation fails
    }
    setLoading(true);
    const jsonData = {
      "siteDownloadRequest": {
        "siteUrl": formData.siteURL,
        "assetType": formData.selection,
        "sourceRequestId": "",
        "sourceSystemCallbackSproc": "",
        "downloadLocation": formData.downloadLocation,
        "comments": formData.comment,
        "isZipRequired": formData.zipChecked,
      },
      "siteDownloadAssets": formData.formGroups.map(group => ({
        "assetName": group.relativeURLName,
        "assetUrl": group.relativeURL,
        "comments": group.comment,
      }))
    };

    try {
      const apiConfig = await import('../config/apiConfig.json');
      const apiUrl = `${apiConfig.default.apiBaseUrl}${apiConfig.default.endpoints.submitRequest}`;
      const response = await axios.post(apiUrl, jsonData);
      console.log(response,"response")
      setApiStatus({ success: true, message: 'Submission successful!' });
    } catch (error) {
      setApiStatus({ success: false, message: `Submission failed: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container className="mt-5 mb-5 p-4 shadow-lg bg-white rounded" style={{ maxWidth: "800px", borderRadius: "40px" }}>

      <h2 className="text-center mb-4">SPO Site Download</h2>
      <p className="text-muted text-center mb-4">Download SPO site content efficiently</p>
      <Form onSubmit={handleSubmit}>

        {/* Loading Indicator */}
        {loading && <div className="text-center"><Spinner animation="border" /></div>}

        {/* Toast Notification */}
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide position="top-end" style={{ position: 'fixed', top: 20, right: 20 }}>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>




        {/* <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide position="bottom-end">
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast> */}
        {/* Site URL Field */}
        <Form.Group className="mb-4" controlId="siteURL">
          <Form.Label>Site URL</Form.Label>
          <Form.Control
            type="text"
            name="siteURL"
            value={formData.siteURL}
            placeholder="Enter Site URL"
            onChange={handleInputChange}
            className="p-2 rounded"
            isInvalid={!!errors.siteURL}
          />
          <Form.Control.Feedback type="invalid">{errors.siteURL}</Form.Control.Feedback>
        </Form.Group>

        {/* Assets Selection */}
        <h4 className="mb-3">Assets</h4>
        <Form.Group className="mb-3">
          {["All", "Library", "List", "Folder"].map(option => (
            <Form.Check
              key={option}
              type="radio"
              id={`${option}Radio`}
              label={option}
              name="selection"
              value={option}
              checked={formData.selection === option}
              onChange={handleRadioChange}
              isInvalid={!!errors.selection}
            />
          ))}
          <Form.Control.Feedback type="invalid">{errors.selection}</Form.Control.Feedback>
        </Form.Group>

        {/* Conditional Input Fields */}
        {(formData.selection === "List" || formData.selection === "Folder" || formData.selection === "Library") && formData.formGroups.map((group, index) => (
          <div className="d-flex align-items-center mb-3" key={index}>
            <Form.Group className="flex-grow-1 me-2">
              <Form.Label>Enter Library or list or folder name</Form.Label>
              <Form.Control
                type="text"
                name="relativeURL"
                value={group.relativeURL}
                placeholder="Enter relative URL for library to download"
                onChange={(e) => handleGroupChange(index, e)}
                className="p-2 mb-2 rounded"
                isInvalid={!!errors[`relativeURL${index}`]}
              />
              <Form.Control.Feedback type="invalid">{errors[`relativeURL${index}`]}</Form.Control.Feedback>
              <Form.Control
                type="text"
                name="relativeURLName"
                value={group.relativeURLName}
                placeholder="Enter relative URL name"
                onChange={(e) => handleGroupChange(index, e)}
                className="p-2 rounded"
                isInvalid={!!errors[`relativeURLName${index}`]}
              />
              <Form.Control.Feedback type="invalid">{errors[`relativeURLName${index}`]}</Form.Control.Feedback>
            </Form.Group>
          </div>
        ))}

        {/* Zip Content Option */}
        <Form.Group className="mb-3">
          <Form.Label>Do you want to zip the content?</Form.Label>
          <Form.Switch
            id="zipContentSwitch"
            name="zipChecked"
            label={formData.zipChecked ? "Yes" : "No"}
            checked={formData.zipChecked}
            onChange={(e) => setFormData({
              ...formData,
              zipChecked: e.target.checked
            })}
            className="custom-toggle"
          />
        </Form.Group>

        {/* Download Location */}
        <Form.Group className="mb-4" controlId="downloadLocation">
          <Form.Label>Download Location</Form.Label>
          <Form.Control
            type="text"
            name="downloadLocation"
            value={formData.downloadLocation}
            placeholder="Enter location"
            onChange={handleInputChange}
            className="p-2 rounded"
            isInvalid={!!errors.downloadLocation}
          />
          <Form.Control.Feedback type="invalid">
            {errors.downloadLocation}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Comments Section */}
        <Form.Group className="mb-3" controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            name="comment"
            value={formData.comment}
            rows={3}
            placeholder="Enter your comment"
            onChange={handleInputChange}
            className="p-2 rounded"
            isInvalid={!!errors.comment}
          />
          <Form.Control.Feedback type="invalid">
            {errors.comment}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Submit Button */}
        <div className="text-center m-5">
          <Button variant="primary" type="submit" className="rounded w-100" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Submit'}
          </Button>
        <div className="text-center mt-3">
        {apiStatus.message && (
    <span className={`label p-2 text-white ${apiStatus.success ? 'bg-success' : 'bg-danger'}`}>
      {apiStatus.message}
    </span>
  )}
        </div>
        </div>
      </Form>



      {/* Toast Notification */}

    </Container>
  );
};

export default FormFile;

