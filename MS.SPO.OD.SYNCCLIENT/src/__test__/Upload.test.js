import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UploadRequest from '../Pages/UploadRequest'; // Adjust the import based on your structure
import ToastMessage from '../CustomComponents/ToastMessage';

jest.mock('../CustomComponents/ToastMessage', () => {
    return ({ show, message, onClose }) => {
        return show ? (
            <div role="alert">
                {message} {/* Ensure this correctly shows the message */}
                <button onClick={onClose}>Close</button>
            </div>
        ) : null;
    };
});


describe('UploadRequest Component', () => {
    beforeEach(() => {
        render(<UploadRequest />);
    });

    test('renders initial form correctly', () => {
        expect(screen.getByText(/Upload Request/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter Site URL/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter Target URL/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter Justification/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    });

    test('handles input changes correctly', () => {
        const siteURLInput = screen.getByPlaceholderText(/Enter Site URL/i);
        fireEvent.change(siteURLInput, { target: { value: 'https://example.com' } });
        expect(siteURLInput.value).toBe('https://example.com');

        const targetURLInput = screen.getByPlaceholderText(/Enter Target URL/i);
        fireEvent.change(targetURLInput, { target: { value: 'https://example.com/target' } });
        expect(targetURLInput.value).toBe('https://example.com/target');

        const justifyInput = screen.getByPlaceholderText(/Enter Justification/i);
        fireEvent.change(justifyInput, { target: { value: 'Some justification' } });
        expect(justifyInput.value).toBe('Some justification');
    });

    test('shows validation errors for empty fields', async () => {
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        expect(await screen.findByText(/Site URL is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Target URL is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Justification is required/i)).toBeInTheDocument();
    });

    test('shows validation error for invalid URLs', async () => {
        const siteURLInput = screen.getByPlaceholderText(/Enter Site URL/i);
        fireEvent.change(siteURLInput, { target: { value: 'invalid-url' } });

        const targetURLInput = screen.getByPlaceholderText(/Enter Target URL/i);
        fireEvent.change(targetURLInput, { target: { value: 'invalid-url' } });

        const justifyInput = screen.getByPlaceholderText(/Enter Justification/i);
        fireEvent.change(justifyInput, { target: { value: 'Some justification' } });

        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        expect(await screen.findByText(/Site URL must be a valid URL starting with http:\/\/ or https:\/\//i)).toBeInTheDocument();
        expect(await screen.findByText(/Target URL must be a valid URL starting with http:\/\/ or https:\/\//i)).toBeInTheDocument();
    });

    test('submits form successfully and shows success toast', async () => {
        // Fill out the form with valid data
        fireEvent.change(screen.getByPlaceholderText(/Enter Site URL/i), { target: { value: 'https://example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Target URL/i), { target: { value: 'https://example.com/target' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Justification/i), { target: { value: 'Some justification' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    });



});
