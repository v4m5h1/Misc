import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = ({ config, onNavClick }) => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">SPO Site Downloader</Navbar.Brand>
      <Nav className="mr-auto">
        {config.navLinks.map((link, index) => (
          <Nav.Link key={index} href="#" onClick={() => onNavClick(link.name)}>
            {link.name}
          </Nav.Link>
        ))}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
