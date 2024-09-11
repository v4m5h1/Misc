import { useState } from 'react';
import axios from 'axios';

const useFormFile = (apiConfig) => {
    const initialFormData = {
        siteURL: "",
        selection: "",
        downloadLocation: "",
        comment: "",
        formGroups: [{ relativeURL: "", relativeURLName: "" }],
        zipChecked: false,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle changes to the input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: null
            }));
        }
    };

    // Handle changes to group fields
    const handleGroupChange = (index, event) => {
        const { name, value } = event.target;
        setFormData(prevData => {
            const updatedGroups = [...prevData.formGroups];
    
            // Ensure the index is within bounds
            if (index >= updatedGroups.length || index < 0) {
                console.error(`Index ${index} is out of bounds`);
                return prevData;
            }
    
            // Update the specific group
            updatedGroups[index] = {
                ...updatedGroups[index],
                [name]: value
            };
    
            return {
                ...prevData,
                formGroups: updatedGroups
            };
        });
    };
    

    // Validate form fields
    const validateForm = () => {
        let newErrors = {};
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

        if (!formData.siteURL.trim()) {
            newErrors.siteURL = "Site URL is required.";
        } else if (!urlPattern.test(formData.siteURL.trim())) {
            newErrors.siteURL = "Invalid URL format.";
        }

        if (!formData.selection.trim()) {
            newErrors.selection = "Asset selection is required.";
        } else if (["List", "Folder", "Library"].includes(formData.selection)) {
            formData.formGroups.forEach((group, index) => {
                if (!group.relativeURL.trim()) {
                    newErrors[`relativeURL${index}`] = "Relative URL is required.";
                }
                if (!group.relativeURLName.trim()) {
                    newErrors[`relativeURLName${index}`] = "Relative URL Name is required.";
                }
            });
        }

        if (!formData.downloadLocation.trim()) {
            newErrors.downloadLocation = "Download location is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        console.log(formData,"hrloo")
        e.preventDefault();
        console.log("Submit button clicked");
    
        if (!validateForm()) {
            setShowToast(true);
            setToastMessage('Validation failed, please fill all required fields.');
            return;
        }
        setLoading(true);
        console.log("Form is valid, submitting...");
    
        try {
            const apiUrl = `${apiConfig.apiBaseUrl}${apiConfig.endpoints.submitRequest}`; // Fixed string interpolation
            console.log(`API URL: ${apiUrl}`);
            console.log("Form Data:", formData);
             debugger;
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
                  "comments":  formData.comment,
                }))
              };
              console.log("request:", jsonData);
            const response = await axios.post(apiUrl, jsonData);
            console.log("Response:", response);
    
            setShowToast(true);
            setToastMessage('Submission successful!');
        } catch (error) {
            console.error("Submission failed:", error);
            setShowToast(true);
            setToastMessage(`Submission failed: ${error.message}`); // Fixed string interpolation
        } finally {
            setLoading(false);
        }
    };
    

    // Handle radio button changes
    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
            formGroups: (value === "List" || value === "Folder" || value === "Library") ? prevData.formGroups : [{ relativeURL: "", relativeURLName: "" }]
        }));
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: null
            }));
        }
    };

    return {
        formData, setFormData, handleInputChange, handleGroupChange, handleSubmit, handleRadioChange,
        errors, showToast, setShowToast, toastMessage, loading
    };
};

export default useFormFile;
