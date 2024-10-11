import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ config }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate()
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  const handleNavigation = (path) => {
    navigate(path);
    closeMobileMenu();
  };
  return (
    <nav className="bg-black">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-4">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              {/* Hamburger Icon */}
              <svg className="block w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

              {/* Close Icon */}
              <svg className="hidden w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0">
              <img className="w-auto h-8" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* Render Nav Links from config */}
                {config.navLinks.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.path}
                    onClick={() => handleNavigation(link.path)}
                    exact={link.exact}
                    className={({ isActive }) => `px-3 py-2 text-sm no-underline font-medium rounded-md ${isActive ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {config.navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={() => handleNavigation(link.path)}
              className={({ isActive }) => `block px-3 py-2 text-base font-medium rounded-md ${isActive ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  config: PropTypes.shape({
    navLinks: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        exact: PropTypes.bool,
      })
    ).isRequired,
  }).isRequired,
};

export default Navbar;
