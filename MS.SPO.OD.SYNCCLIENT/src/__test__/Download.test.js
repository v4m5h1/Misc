import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormFile from '../Pages/DownloadRequest'; // Adjust the import according to your directory structure
import useFormFile from '../hooks/downloadFormValidation'; // Adjust if necessary

jest.mock('../hooks/downloadFormValidation'); // Mock the useFormFile hook

describe('FormFile', () => {
    const mockSubmit = jest.fn();

    const assetOptions = [
        { value: 'All', label: 'All', addtlInfo: true },
        { value: 'Assets', label: 'Assets', addtlInfo: true },
        // Add more options as needed
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
            setFormData: jest.fn(), // Keep this as a mock
            handleInputChange: jest.fn(), // This is your input change handler
            handleGroupChange: jest.fn(),
            handleSubmit: mockSubmit,
            handleRadioChange: jest.fn(),
            errors: {},
            showToast: false,
            setShowToast: jest.fn(),
            toastMessage: '',
            loading: false,
            apiStatus: { success: false, message: '' },
            isFormValid: true,
            assetOptions, // Include the asset options for testing
        });
    });

    beforeAll(() => {
        HTMLFormElement.prototype.submit = jest.fn(); // Mock the submit method
    });

    it('renders all form inputs', () => {
        render(<FormFile />);
        expect(screen.getByLabelText(/site url/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Download Location/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Comment/i)).toBeInTheDocument();
    });

    it('renders additional inputs for assets with additional info', async () => {
        render(<FormFile />);

        // Check that all the necessary labels are present
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

        expect(screen.getByText((content) =>
            content.startsWith('Submission Failed')
        )).toBeInTheDocument();
    });

    it('handles input changes correctly', () => {
        const setFormDataMock = jest.fn(); // Create a mock for setFormData

        // Mocking the useFormFile hook again to return the mocked setFormData
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
                // Simulate the input change calling setFormData
                setFormDataMock({ ...useFormFile().formData, siteURL: e.target.value });
            }),
            handleGroupChange: jest.fn(),
            handleSubmit: mockSubmit,
            handleRadioChange: jest.fn(),
            errors: {},
            showToast: false,
            setShowToast: jest.fn(),
            toastMessage: '',
            loading: false,
            apiStatus: { success: false, message: '' },
            isFormValid: true,
            assetOptions,
        });

        render(<FormFile />);

        const siteURLInput = screen.getByLabelText(/site url/i); // Get input by label
        fireEvent.change(siteURLInput, { target: { value: 'https://example.com' } });

        // Check if setFormData was called with the correct argument
        expect(setFormDataMock).toHaveBeenCalledWith({
            siteURL: 'https://example.com',
            selection: '',
            downloadLocation: '',
            zipChecked: false,
            comment: '',
            formGroups: [],
        });

    });

    it('submits the form with valid data', () => {
        render(<FormFile />);

        // Fill out the form with valid data
        fireEvent.change(screen.getByLabelText(/Site URL/i), { target: { value: 'https://example.com' } });
        fireEvent.change(screen.getByLabelText(/Download Location/i), { target: { value: '/downloads' } });

        // Assuming the asset is selected and the required fields are filled
        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);

        expect(mockSubmit).toHaveBeenCalled(); // Check that the submit function was called
    });
});
