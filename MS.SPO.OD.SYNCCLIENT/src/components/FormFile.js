import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import useFormFile from '../reusability/useFormFile';
import RadioButtonGroup from '../reusability/RadioButtonGroup';
import ToastMessage from '../reusability/ToastMessage';
import ToggleSwitch from '../reusability/ToggleSwitch';
import apiConfig from '../config/apiConfig';
import assetOptions from '../config/assetsOptionsConfig.json'

const FormFile = () => {
    const {
        formData, setFormData, handleInputChange, handleGroupChange, handleSubmit,
        handleRadioChange, errors, showToast, setShowToast, toastMessage, loading, apiStatus, isFormValid
    } = useFormFile(apiConfig);

    const isAssetsEnabled = assetOptions.filter(asset => asset.addtlInfo).map(asset => asset.value).includes(formData.selection);

    
    return (                
                <div className={`${apiStatus.success ? "col-md-12" : "mx-5"}`}>
                    <div className={`${apiStatus.success ? "col-md-7 ms-5 float-start" : ""}`}>
                        <div className="mt-5 mb-5 p-4 shadow-lg bg-white rounded">
                            <h4 className="text-center mb-4">SPO Site Download</h4>
                            {/* <p className="text-muted text-center mb-4">Efficiently manage and download your SPO site content.</p> */}
                            
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <label>Site URL</label>
                                    <Form.Control
                                        type="text"
                                        name="siteURL"
                                        value={formData.siteURL || ''}
                                        placeholder="Enter Site URL"
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.siteURL}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.siteURL}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            
        
                            <div className={`${isAssetsEnabled ? "" : "mb-3"}`}>
                            <label>Assets</label>
<RadioButtonGroup
  options={assetOptions}
  name="selection"
  selectedValue={formData.selection}
  onChange={handleRadioChange}
  error={errors.selection}
/>

{isAssetsEnabled && formData.formGroups.map((group, index) => (
  <div key={index} className="mb-3">
    <Form.Group className="mb-1">
      <label>{`Enter ${formData.selection} Name`}</label>
      <Form.Control
        type="text"
        name="relativeURL"
        value={group.relativeURL || ''}
        placeholder={`Enter ${formData.selection.toLowerCase()} name`}
        onChange={e => handleGroupChange(index, e)}
        isInvalid={!!errors[`relativeURLs[${index}]`]} // Fixed string interpolation
      />
      <Form.Control.Feedback type="invalid">
        {errors[`relativeURLs[${index}]`]}
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group>
      <label>{`Enter ${formData.selection} Relative URL`}</label>
      <Form.Control
        type="text"
        name="relativeURLName"
        value={group.relativeURLName || ''}
        placeholder={`Enter relative URL for ${formData.selection.toLowerCase()}`}
        onChange={e=>handleGroupChange(index,e)}
        isInvalid={!!errors[`relativeURLName${index}`]}
      />
      <Form.Control.Feedback type="invalid">
        {errors[`relativeURLName${index}`]}
      </Form.Control.Feedback>
    </Form.Group>
    </div>))}
    




    <Form.Group className="mb-3">
  <label>Download Location</label>
  <Form.Control
    type="text"
    name="downloadLocation"
    value={formData.downloadLocation || ''}
    placeholder="Enter location"
    onChange={handleInputChange}
    isInvalid={!errors.downloadLocation}
  />
  <Form.Control.Feedback type="invalid">
    {errors.downloadLocation}
  </Form.Control.Feedback>
</Form.Group>

<div className="mb-3">
  <label>Do you want to zip the content?</label>
  <Form.Check
    type="switch"
    id="zipContents"
    onChange={(e) => setFormData({ ...formData, zipChecked: e.target.checked })}
  />
</div>

<Form.Group className="mb-3">
  <label>Comment</label>
  <Form.Control
    type="text"
    name="comment"
    value={formData.comment || ''}
    placeholder="Enter your comment"
    onChange={handleInputChange}
    isInvalid={!!errors.comment}
  />
  <Form.Control.Feedback type="invalid">
    {errors.comment}
  </Form.Control.Feedback>
</Form.Group>


<Button
  variant={`${loading ? 'secondary' : 'primary'}`}
  type="submit"
  className="rounded w-100"
  disabled={loading || !isFormValid}
>
  {loading ? 'Processing...' : 'Submit'}
</Button>
<div className="text-center mt-3">
  {apiStatus.message && (
    <span className={`p-2 text-white ${apiStatus.success ? 'bg-success' : 'bg-danger'}`}>
      {apiStatus.success ? "Submitted Successfully. Review submitted information on screen." : typeof apiStatus.message === 'string' ? JSON.parse(apiStatus.message).validationResponse.message : ''}
    </span>
  )}
</div>
</Form>
<ToastMessage show={showToast} onClose={() => setShowToast(false)} message={toastMessage} />
    </div>
<div className={`${apiStatus.success ? 'col-md-4 mt-5 float-end' : 'd-none'}`}>
  <pre>
    <b>Information Submitted</b>
    <br />
    {apiStatus.success && apiStatus.message && JSON.parse(apiStatus.message) && JSON.parse(apiStatus.message).siteDownloadRequestAssets ? JSON.stringify(JSON.parse(apiStatus.message).siteDownloadRequestAssets, null, 2) : ''}
  </pre>
</div>
</div>
  
        );
};

export default FormFile;
