import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Pages/NavBar';

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

const mockConfig = {
    navLinks: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ],
};

const renderNavbar = () => {
    return render(
        <BrowserRouter>
            <Navbar config={mockConfig} />
        </BrowserRouter>
    );
};

describe('Navbar', () => {
    test('renders the company logo', () => {
        renderNavbar();
        const logo = screen.getByAltText('Your Company');
        expect(logo).toBeInTheDocument();
    });

    test('renders desktop navigation links', () => {
        renderNavbar();
        const desktopNav = screen.getByRole('navigation').querySelector('.sm\\:block');
        mockConfig.navLinks.forEach((link) => {
            const linkElement = desktopNav.querySelector(`[data-testid="${link.name.toLowerCase().replace(' ', '-')}-link"]`);
            expect(linkElement).toBeInTheDocument();
            expect(linkElement).toHaveTextContent(link.name);
        });
    });

    test('mobile menu is initially hidden', () => {
        renderNavbar();
        const mobileMenu = screen.getByRole('navigation').querySelector('#mobile-menu');
        expect(mobileMenu).toHaveClass('hidden');
    });

    test('toggles mobile menu when hamburger button is clicked', () => {
        renderNavbar();
        const hamburgerButton = screen.getByRole('button', { name: /open main menu/i });
        const mobileMenu = screen.getByRole('navigation').querySelector('#mobile-menu');

        fireEvent.click(hamburgerButton);
        expect(mobileMenu).toHaveClass('block');

        fireEvent.click(hamburgerButton);
        expect(mobileMenu).toHaveClass('hidden');
    });

    test('renders mobile navigation links when menu is open', () => {
        renderNavbar();
        const hamburgerButton = screen.getByRole('button', { name: /open main menu/i });
        fireEvent.click(hamburgerButton);

        const mobileMenu = screen.getByRole('navigation').querySelector('#mobile-menu');
        mockConfig.navLinks.forEach((link) => {
            const linkElement = mobileMenu.querySelector(`a[href="${link.path}"]`);
            expect(linkElement).toBeInTheDocument();
            expect(linkElement).toHaveTextContent(link.name);
        });
    });

    test('closes mobile menu when a link is clicked', () => {
        renderNavbar();
        const hamburgerButton = screen.getByRole('button', { name: /open main menu/i });
        fireEvent.click(hamburgerButton);

        const mobileMenu = screen.getByRole('navigation').querySelector('#mobile-menu');
        const mobileLink = mobileMenu.querySelector('a');
        fireEvent.click(mobileLink);

        expect(mobileMenu).toHaveClass('hidden');
    });

    test('desktop links have correct href attributes', () => {
        renderNavbar();
        const desktopNav = screen.getByRole('navigation').querySelector('.sm\\:block');
        mockConfig.navLinks.forEach((link) => {
            const linkElement = desktopNav.querySelector(`[data-testid="${link.name.toLowerCase().replace(' ', '-')}-link"]`);
            expect(linkElement).toHaveAttribute('href', link.path);
        });
    });

    test('mobile menu button has correct accessibility attributes', () => {
        renderNavbar();
        const hamburgerButton = screen.getByRole('button', { name: /open main menu/i });
        expect(hamburgerButton).toHaveAttribute('aria-controls', 'mobile-menu');
        expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('aria-expanded attribute changes when mobile menu is toggled', () => {
        renderNavbar();
        const hamburgerButton = screen.getByRole('button', { name: /open main menu/i });

        expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');

        fireEvent.click(hamburgerButton);
        expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');

        fireEvent.click(hamburgerButton);
        expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('hamburger icon is visible when mobile menu is closed', () => {
        renderNavbar();
        const hamburgerIcon = screen.getByRole('navigation').querySelector('svg:not(.hidden)');
        expect(hamburgerIcon).toBeInTheDocument();
        expect(hamburgerIcon).toHaveAttribute('aria-hidden', 'true');
    });

    test('close icon is visible when mobile menu is open', () => {
        renderNavbar();
        const hamburgerButton = screen.getByRole('button', { name: /open main menu/i });
        fireEvent.click(hamburgerButton);

        const closeIcon = screen.getByRole('navigation').querySelector('svg:not(.hidden)');
        expect(closeIcon).toBeInTheDocument();
        expect(closeIcon).toHaveAttribute('aria-hidden', 'true');
    });

    test('renders correct number of links in both desktop and mobile views', () => {
        renderNavbar();
        const desktopLinks = screen.getByRole('navigation').querySelectorAll('.sm\\:block a');
        expect(desktopLinks).toHaveLength(mockConfig.navLinks.length);

        const hamburgerButton = screen.getByRole('button', { name: /open main menu/i });
        fireEvent.click(hamburgerButton);

        const mobileLinks = screen.getByRole('navigation').querySelectorAll('#mobile-menu a');
        expect(mobileLinks).toHaveLength(mockConfig.navLinks.length);
    });

    test('mobile menu links have correct href attributes', () => {
        renderNavbar();
        const hamburgerButton = screen.getByRole('button', { name: /open main menu/i });
        fireEvent.click(hamburgerButton);

        const mobileMenu = screen.getByRole('navigation').querySelector('#mobile-menu');
        mockConfig.navLinks.forEach((link) => {
            const linkElement = mobileMenu.querySelector(`a[href="${link.path}"]`);
            expect(linkElement).toHaveAttribute('href', link.path);
        });
    });
});