import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import useFormFile from '../reusability/useFormFile';
import RadioButtonGroup from '../reusability/RadioButtonGroup';
import ToastMessage from '../reusability/ToastMessage';
import ToggleSwitch from '../reusability/ToggleSwitch';
import apiConfig from '../config/apiConfig.json';

const FormFile = () => {
    const {
        formData, setFormData, handleInputChange, handleGroupChange, handleSubmit,
        handleRadioChange, errors, showToast, setShowToast, toastMessage, loading, apiStatus, isFormValid
    } = useFormFile(apiConfig);

    const isAssetsEnabled = ["List", "Folder", "Library"].includes(formData.selection);
    const getAssetLabel = () => {
        switch (formData.selection) {
            case "List":
                return "Enter List Name";
            case "Folder":
                return "Enter Folder Name";
            case "Library":
                return "Enter Library Name";
            default:
                return "Enter Library, List, or Folder Name";
        }
    };
    return (
        <Container className="mt-5 mb-5 p-4 shadow-lg bg-white rounded" style={{ maxWidth: "800px", borderRadius: "40px" }}>
            <h4 className="text-center mb-4">SPO Site Download</h4>
            <p className="text-muted text-center mb-4">Efficiently manage and download your SPO site content.</p>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Site URL</Form.Label>
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

                <h4>Assets</h4>
                <RadioButtonGroup
                    options={[
                        { label: "All", value: "All" },
                        { label: "Library", value: "Library" },
                        { label: "List", value: "List" },
                        { label: "Folder", value: "Folder" }
                    ]}
                    name="selection"
                    selectedValue={formData.selection}
                    onChange={handleRadioChange}
                    error={errors.selection}
                />

                {isAssetsEnabled && formData.formGroups.map((group, index) => (
                    <div key={index} className="mb-3">
                        <Form.Group className="mb-3">
                        <Form.Label>{getAssetLabel()}</Form.Label>
                            <Form.Control
                                type="text"
                                name="relativeURL"
                                value={group.relativeURL || ''}
                                placeholder={`Enter relative URL for ${formData.selection.toLowerCase()}`}
                                onChange={e => handleGroupChange(index, e)}
                                isInvalid={!!errors[`relativeURL${index}`]} // Fixed string interpolation
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors[`relativeURL${index}`]}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter Relative URL Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="relativeURLName"
                                value={group.relativeURLName || ''}
                                placeholder={`Enter relative URL for ${formData.selection.toLowerCase()}`}
                                onChange={e => handleGroupChange(index, e)}
                                isInvalid={!!errors[`relativeURLName${index}`]} // Fixed string interpolation
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors[`relativeURLName${index}`]}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                ))}

                <h4>Additional Settings</h4>
                <Form.Group className="mb-3">
                    <Form.Label>Download Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="downloadLocation"
                        value={formData.downloadLocation || ''}
                        placeholder="Enter location"
                        onChange={handleInputChange}
                        isInvalid={!!errors.downloadLocation}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.downloadLocation}
                    </Form.Control.Feedback>
                </Form.Group>

                <ToggleSwitch
                    id="zipContentSwitch"
                    label="Do you want to zip the content?"
                    checked={formData.zipChecked || false}
                    onChange={(e) => setFormData({ ...formData, zipChecked: e.target.checked })}
                />

                <h4>Comments</h4>
                <Form.Group className="mb-3">
                    <Form.Label>Comment</Form.Label>
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
                    variant="primary"
                    type="submit"
                    className="rounded w-100"
                    disabled={loading||!isFormValid}
                >
                    {loading ? 'Processing...' : 'Submit'}
                </Button>
                <div className="text-center mt-3">
                    {apiStatus.message && (
                        <span className={`p-2 text-white ${apiStatus.success ? 'bg-success' : 'bg-danger'}`}>
                            {apiStatus.message}
                        </span>
                    )}
                </div>
            </Form>
            <ToastMessage show={showToast} onClose={() => setShowToast(false)} message={toastMessage} />
        </Container>
    );
};

export default FormFile;
