import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdAccountCircle } from 'react-icons/md';
import lessonsList from '../modules/app_configuration/list_lessons';
import { navbar_title} from '../modules/app_configuration/app_texts';


interface NavbarProps {
  disabled: boolean;
}

const NavbarComponent: React.FC<NavbarProps> = ({ disabled }) => {
  const isMobileDevice = window.innerWidth <= 767; // Überprüfung auf mobilen Geräten

  const uniqueCategories = Array.from(new Set(lessonsList.map((lesson) => lesson.category)));

  return (
    <Navbar bg="light" variant="light" expand="lg" fixed="top" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Container>
        <Navbar.Brand>
          <Container>
            <div className="d-flex align-items-center">
              <img src="logo.svg" alt="Logo" style={{ height: '1.5vw' }} className="mr-2" /> {/* Logo hinzugefügt */}
              <h5 className="m-0">{ navbar_title}</h5>
            </div>
          </Container>
        </Navbar.Brand>
        <Navbar.Toggle className="ms-auto" aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {uniqueCategories.map((category) => {
              const categorySlug = category.toLowerCase().replace(/ /g, '-');
              return (
                <Nav.Link key={categorySlug} as={Link} to={`/${categorySlug}`} disabled={disabled}>
                  {category}
                </Nav.Link>
              );
            })}
          </Nav>
          <Nav>
            {isMobileDevice ? (
              <Nav.Link as={Link} to="/dashboard" disabled={disabled}>
                User Dashboard
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/dashboard" disabled={disabled}>
                <MdAccountCircle size="1.5vw" /> {/* Größe für Desktop und andere Geräte */}
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
