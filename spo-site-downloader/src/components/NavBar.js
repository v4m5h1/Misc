import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

const NavBar = ({ config }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path) => {
    navigate(path);
  };

  if (!config || !config.navLinks) {
    // Handle the case where config or navLinks are not defined
    return <div>Error: Navigation links are not available.</div>;
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">SPO Site Downloader</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {config.navLinks.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <Nav.Link
                key={index}
                as={Link}
                to={link.path}
                className={isActive ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.path);
                }}
              >
                {link.name}
              </Nav.Link>
            );
          })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavBar.propTypes = {
  config: PropTypes.shape({
    navLinks: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default NavBar;
