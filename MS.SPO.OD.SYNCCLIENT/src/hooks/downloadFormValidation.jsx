import { useState } from 'react';
import crudOperations from '../CustomComponents/crudOperations';
import assetOptions from '../config/assetsOptionsConfig.json';

const useFormFile = (apiConfig) => {
    const initialFormData = {
        siteURL: "",
        selection: assetOptions[0].value,
        downloadLocation: "",
        comment: "",
        formGroups: [{ relativeURL: "", relativeURLName: "" }],
        zipChecked: false,
    };

    const { get, post, error, isLoading } = crudOperations();

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiStatus, setApiStatus] = useState({ message: '', success: false });
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

    const isAssetsEnabled = assetOptions.filter(asset => asset.addtlInfo).map(asset => asset.value).includes(formData.selection);

    // Validate form fields
    const validateForm = () => {
        let newErrors = {};
        const urlPattern = /^(http|https):\/\/[^ "]+$/;

        if (!formData.siteURL.trim()) {
            newErrors.siteURL = "Site URL is required.";
        } else if (!urlPattern.test(formData.siteURL.trim())) {
            newErrors.siteURL = "Invalid URL format.";
        }

        if (!formData.selection.trim()) {
            newErrors.selection = "Asset selection is required.";
        } else if (isAssetsEnabled) {
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
        console.log(formData, "hrloo")
        e.preventDefault();
        console.log("Submit button clicked");

        if (!validateForm()) {
            setShowToast(true);
            setToastMessage('Validation failed, please fill all required fields.');
            return;
        }
        setLoading(true);
        setApiStatus({ message: '', success: false });
        console.log("Form is valid, submitting...");

        try {
            const apiUrl = `${apiConfig.endpoints.submitRequest}`; // Fixed string interpolation
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
                    "comments": formData.comment,
                }))
            };
            console.log("request:", jsonData);
            const response = await post(apiUrl, jsonData);
            console.log("Response:", response);

            setShowToast(true);
            setToastMessage('Submission successful!');
            setApiStatus({ message: JSON.stringify(response), success: response.validationResponse.isSuccess });
        } catch (error) {
            console.error("Submission failed:", error);
            setShowToast(true);
            setToastMessage(`Submission failed: ${error.message}`);
            setApiStatus({ message: `Submission failed: ${error.message}`, success: false });
        } finally {
            setLoading(false);
        }
    };


    // // Handle radio button changes
    // const handleRadioChange = (e) => {
    //     const { name, value } = e.target;
    //     const isAddtlInfoEnabled = assetOptions.filter(asset => asset.addtlInfo).map(asset => asset.value).includes(e.target.value);
    //     setFormData(prevData => ({
    //         ...prevData,
    //         [name]: value,
    //         formGroups: isAssetsEnabled ? prevData.formGroups : [{ relativeURL: "", relativeURLName: "" }]
    //     }));
    //     if (errors[name]) {
    //         setErrors(prevErrors => ({
    //             ...prevErrors,
    //             [name]: null
    //         }));
    //     }
    // };
    const handleRadioChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            selection: value,
        }));
    };

    const isFormValid = () => {
        return validateForm() && !loading;
    };

    return {
        formData, setFormData, handleInputChange, handleGroupChange, handleSubmit, handleRadioChange,
        errors, showToast, setShowToast, toastMessage, loading, isFormValid, apiStatus
    };
};

export default useFormFile;
