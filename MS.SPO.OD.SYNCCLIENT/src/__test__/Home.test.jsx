import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import HomePage from '../Pages/Home';
import '@testing-library/jest-dom';

// Mock the `useNavigate` hook from react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('HomePage Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        // Reset mock before each test
        useNavigate.mockReturnValue(mockNavigate);
    });

    test('renders the main heading', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
        expect(screen.getByText('Request Action to Perform')).toBeInTheDocument();
    });

    test('renders Download, Upload, and View Requests buttons', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        expect(screen.getByLabelText('Download Button')).toBeInTheDocument();
        expect(screen.getByLabelText('Upload Button')).toBeInTheDocument();
        expect(screen.getByLabelText('View Requests Button')).toBeInTheDocument();
    });

    test('navigates to /downloadrequest when Download button is clicked', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        const downloadButton = screen.getByLabelText('Download Button');
        fireEvent.click(downloadButton);

        expect(mockNavigate).toHaveBeenCalledWith('/downloadrequest');
    });

    test('navigates to /uploadrequest when Upload button is clicked', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        const uploadButton = screen.getByLabelText('Upload Button');
        fireEvent.click(uploadButton);

        expect(mockNavigate).toHaveBeenCalledWith('/uploadrequest');
    });

    test('navigates to /allrequest when View Requests button is clicked', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        const viewRequestsButton = screen.getByLabelText('View Requests Button');
        fireEvent.click(viewRequestsButton);

        expect(mockNavigate).toHaveBeenCalledWith('/allrequest');
    });
});
