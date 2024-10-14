import React, { useState } from 'react';
import CustomInput from '../CustomComponents/CustomInput';
import ToastMessage from '../CustomComponents/ToastMessage'; // Import your ToastMessage component

const UploadRequest = () => {
    const [formData, setFormData] = useState({
        siteURL: '',
        justify: '',
        targetUrl: '',
    });
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [showToast, setShowToast] = useState(false); // State to manage toast visibility
    const [toastMessage, setToastMessage] = useState(''); // State for the toast message

    // URL pattern for validation
    const urlPattern = /^(http|https):\/\/[^ "]+$/;

    // Validation function
    const validateForm = () => {
        const newErrors = {};
        if (!formData.siteURL) {
            newErrors.siteURL = 'Site URL is required';
        } else if (!urlPattern.test(formData.siteURL)) {
            newErrors.siteURL = 'Site URL must be a valid URL starting with http:// or https://';
        }

        if (!formData.targetUrl) {
            newErrors.targetUrl = 'Target URL is required';
        } else if (!urlPattern.test(formData.targetUrl)) {
            newErrors.targetUrl = 'Target URL must be a valid URL starting with http:// or https://';
        }

        if (!formData.justify) {
            newErrors.justify = 'Justification is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if there are no errors
    };

    const handleInputChange = (field, value) => {
        // Update form data
        setFormData((prevData) => ({ ...prevData, [field]: value }));

        // Clear the corresponding error if it exists
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            if (newErrors[field]) {
                delete newErrors[field];
            }
            return newErrors;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form data
        if (!validateForm()) {
            setToastMessage('Please correct the errors in the form.');
            return; // Stop submission if there are errors
        }

        setSubmissionStatus('Processing...');
        console.log(formData);

        // Simulate form submission
        setTimeout(() => {
            setSubmissionStatus('Submitted Successfully');
            setToastMessage('Form submitted successfully!');
            setShowToast(true);
            // Clear form after submission (optional)
            setFormData({
                siteURL: '',
                justify: '',
                targetUrl: '',
            });
        }, 2000);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="p-4 mx-20 mt-5 mb-5 bg-white rounded shadow-lg">
                    <h4 className="mb-4 text-3xl font-semibold text-center">Upload Request</h4>
                    <CustomInput
                        label="Site URL"
                        value={formData.siteURL}
                        onChange={(e) => handleInputChange('siteURL', e.target.value)}
                        placeholder="Enter Site URL"
                        error={errors.siteURL}
                    />
                    <CustomInput
                        label="Target URL"
                        value={formData.targetUrl}
                        onChange={(e) => handleInputChange('targetUrl', e.target.value)}
                        placeholder="Enter Target URL"
                        error={errors.targetUrl}
                    />
                    <CustomInput
                        label="Justification"
                        value={formData.justify}
                        onChange={(e) => handleInputChange('justify', e.target.value)}
                        placeholder="Enter Justification"
                        error={errors.justify}
                    />
                    <button
                        type="submit"
                        className={`rounded w-full py-2 mt-10 text-white ${submissionStatus === 'Processing...' ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                        disabled={submissionStatus === 'Processing...'}
                    >
                        {submissionStatus || 'Submit'}
                    </button>
                </div>
            </form>

            {/* Toast message for submission status */}
            <ToastMessage
                show={showToast}
                onClose={() => setShowToast(false)} // Close toast when clicked
                message={toastMessage}
            />
        </div>
    );
};

export default UploadRequest;
