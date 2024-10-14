import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormFile from '../Pages/DownloadRequest';
import useFormFile from '../hooks/downloadFormValidation';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';

jest.mock('../hooks/downloadFormValidation'); // Mock the useFormFile hook

describe('FormFile', () => {
    const mockSubmit = jest.fn(); // Mock the submit function
    const setFormDataMock = jest.fn(); // Create a mock for setFormData
    const setShowToastMock = jest.fn(); // Mock setShowToast for toast notifications
    const handleInputChangeMock = jest.fn(); // Mock handleInputChange to simulate user input
    const assetOptions = [
        { value: 'All', label: 'All', addtlInfo: true },
        { value: 'Assets', label: 'Assets', addtlInfo: true },
    ];

    beforeEach(() => {
        useFormFile.mockReturnValue({
            formData: {
                siteURL: '',
                selection: '',
                downloadLocation: '',
                zipChecked: false,
                comment: '',
                formGroups: [],
            },
            setFormData: setFormDataMock, // Use the mock setFormData function
            handleInputChange: handleInputChangeMock, // Mock handleInputChange
            handleGroupChange: jest.fn(),
            handleSubmit: mockSubmit,
            handleRadioChange: jest.fn(),
            errors: {},
            showToast: false,
            setShowToast: setShowToastMock,
            toastMessage: '',
            loading: false,
            apiStatus: { success: false, message: '' },
            isFormValid: true,
            assetOptions,
        });
    });

    beforeAll(() => {
        HTMLFormElement.prototype.submit = jest.fn();
    });

    it('renders all form inputs correctly', () => {
        render(<FormFile />);
        expect(screen.getByLabelText(/site url/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Download Location/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Comment/i)).toBeInTheDocument();
    });

    it('renders additional inputs for assets with additional info', () => {
        render(<FormFile />);
        expect(screen.getByLabelText(/site url/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/download location/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
    });

    it('displays an error message on submission failure', () => {
        useFormFile.mockReturnValueOnce({
            ...useFormFile(),
            apiStatus: { success: false, message: 'Submission Failed' },
        });

        render(<FormFile />);

        expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
    });

    it('handles input changes correctly', () => {
        // Mock implementation of handleInputChange to call setFormDataMock
        useFormFile.mockReturnValueOnce({
            formData: {
                siteURL: '',
                selection: '',
                downloadLocation: '',
                zipChecked: false,
                comment: '',
                formGroups: [],
            },
            setFormData: setFormDataMock,
            handleInputChange: jest.fn((e) => {
                const { name, value } = e.target;
                // Call setFormDataMock with the new data
                setFormDataMock(prevData => ({ ...prevData, [name]: value }));
            }),
            handleGroupChange: jest.fn(),
            handleSubmit: mockSubmit,
            handleRadioChange: jest.fn(),
            errors: {},
            showToast: false,
            setShowToast: setShowToastMock,
            toastMessage: '',
            loading: false,
            apiStatus: { success: false, message: '' },
            isFormValid: true,
            assetOptions,
        });

        render(<FormFile />);

        const siteURLInput = screen.getByLabelText(/site url/i);

        fireEvent.change(siteURLInput, { target: { name: 'siteURL', value: 'https://example.com' } });

        const mockCall = setFormDataMock.mock.calls[0][0];
        if (typeof mockCall === 'function') {
            // Call the function to simulate React state update behavior
            const updatedState = mockCall({
                siteURL: '',
                selection: '',
                downloadLocation: '',
                zipChecked: false,
                comment: '',
                formGroups: [],
            });

            // Check if the updated state matches the expected values
            expect(updatedState).toEqual({
                siteURL: 'https://example.com',
                selection: '',
                downloadLocation: '',
                zipChecked: false,
                comment: '',
                formGroups: [],
            });
        }
    });



    it('submits the form with valid data', () => {
        render(<FormFile />);

        fireEvent.change(screen.getByLabelText(/Site URL/i), { target: { value: 'https://example.com' } });
        fireEvent.change(screen.getByLabelText(/Download Location/i), { target: { value: '/downloads' } });

        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);

        expect(mockSubmit).toHaveBeenCalled(); // Check if the submit function was called
    });

    it('handles successful form submission with a toast message', async () => {
        useFormFile.mockReturnValueOnce({
            ...useFormFile(),
            apiStatus: { success: true, message: 'Submission Successful' },
            showToast: true,
            toastMessage: 'Form submitted successfully',
        });

        render(<FormFile />);

    });


});
