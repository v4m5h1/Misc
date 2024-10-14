import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Pages/Footer';

describe('Footer', () => {
    test('renders without crashing', () => {
        render(<Footer />);
        expect(screen.getByText(/© 2024 Morgan Stanley. All Rights Reserved./)).toBeInTheDocument();
    });

    test('displays the correct copyright text', () => {
        render(<Footer />);
        expect(screen.getByText('© 2024 Morgan Stanley. All Rights Reserved.')).toBeInTheDocument();
    });

    test('has the correct CSS classes', () => {
        render(<Footer />);
        const footerElement = screen.getByText(/© 2024 Morgan Stanley. All Rights Reserved./).closest('div');
        expect(footerElement).toHaveClass('fixed bottom-0 w-full py-2 mt-10 text-xs text-center text-gray-600 bg-gray-100');
    });

    test('copyright text has the correct CSS class', () => {
        render(<Footer />);
        const copyrightText = screen.getByText('© 2024 Morgan Stanley. All Rights Reserved.');
        expect(copyrightText).toHaveClass('text-base');
    });
});