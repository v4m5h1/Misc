import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormField from './FormField';
import { fetchSiteUrls } from '../services/apiService';
import { validateForm } from '../utils/validation';

const NewDownloadRequest = () => {
  const [siteUrl, setSiteUrl] = useState('');
  const [assetType, setAssetType] = useState('');
  const [downloadLocation, setDownloadLocation] = useState('');
  const [comments, setComments] = useState('');
  const [isZipRequired, setIsZipRequired] = useState(false);
  const [errors, setErrors] = useState({});
  const [availableUrls, setAvailableUrls] = useState([]);
  const [siteId, setSiteId] = useState('');
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  useEffect(() => {
    const loadUrls = async () => {
      const sites = await fetchSiteUrls();
      setAvailableUrls(sites);
    };

    loadUrls();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formValues = { siteUrl, assetType, downloadLocation };
    const validationErrors = validateForm(formValues, availableUrls);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const selectedSite = availableUrls.find(url => url.siteUrl === siteUrl);
      setSiteId(selectedSite.siteId);

      const requestData = {
        siteDownloadRequest: {
          siteUrl,
          assetType,
          siteId,
          downloadRootLocation: downloadLocation,
          comments,
          isZipRequired,
        },
      };
      console.log('Submitting form', requestData);
      // Submit form logic...
    }
  };

  const handleAssetTypeChange = (value) => {
    setAssetType(value);
    setShowAdditionalFields(value !== 'Site');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        label="Site URL"
        type="text"
        value={siteUrl}
        onChange={(e) => setSiteUrl(e.target.value)}
        error={errors.siteUrl}
        placeholder="Start typing to search..."
      />

      <Form.Group controlId="formAssetType">
        <Form.Label>Asset Type</Form.Label>
        <Row>
          {['Site', 'Library', 'List', 'Folder'].map(type => (
            <Col key={type}>
              <Form.Check
                type="radio"
                label={type}
                name="assetType"
                value={type}
                checked={assetType === type}
                onChange={(e) => handleAssetTypeChange(e.target.value)}
                isInvalid={!!errors.assetType}
              />
            </Col>
          ))}
        </Row>
        {errors.assetType && <div className="text-danger">{errors.assetType}</div>}
      </Form.Group>

      {showAdditionalFields && (
        <>
          <FormField
            label="Enter Asset Name to Download"
            type="text"
            value={downloadLocation}
            onChange={(e) => setDownloadLocation(e.target.value)}
            error={errors.downloadLocation}
            placeholder="Enter asset name"
          />

          <FormField
            label="Enter Relative URL Only"
            type="text"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Enter relative URL"
          />
        </>
      )}

      <Form.Group controlId="formZip">
        <Form.Label>Do you want to zip the content?</Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="zip"
              value={true}
              checked={isZipRequired === true}
              onChange={() => setIsZipRequired(true)}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="zip"
              value={false}
              checked={isZipRequired === false}
              onChange={() => setIsZipRequired(false)}
            />
          </Col>
        </Row>
      </Form.Group>

      <FormField
        label="Comments"
        as="textarea"
        rows={3}
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Enter comments (optional)"
      />

      <Button type="submit" variant="primary" disabled={Object.keys(errors).length > 0}>
        Submit
      </Button>
    </Form>
  );
};

export default NewDownloadRequest;
