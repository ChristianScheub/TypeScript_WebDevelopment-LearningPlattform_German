import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { MdAccountCircle } from 'react-icons/md';

interface NavbarProps {
  disabled: boolean;
}

const NavbarComponent: React.FC<NavbarProps> = ({ disabled }) => {
  return (
    <Navbar bg="light" variant="light" expand="lg" fixed="top" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Container>
        <Navbar.Brand>
          <Container>
            <div className="d-flex align-items-center">
              <img src="logo.svg" alt="Logo" style={{ height: '1.5vw' }} className="mr-2" /> {/* Logo hinzugefügt */}
              <h5 className="m-0">Grundlagen der Webentwicklung</h5>
            </div>
          </Container>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/grundlagen-kurse" disabled={disabled}>
              Allgemein
            </Nav.Link>
            <Nav.Link as={Link} to="/html-kurse" disabled={disabled}>
              HTML Kurs
            </Nav.Link>
            <Nav.Link as={Link} to="/css-kurse" disabled={disabled}>
              CSS Kurs
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/dashboard" disabled={disabled}>
              <MdAccountCircle size="1.5vw" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
