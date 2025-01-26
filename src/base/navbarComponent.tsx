import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import lessonsList from "../modules/app_configuration/list_lessons";
import { navbar_title } from "../modules/app_configuration/app_texts";
import { featureFlag_DeployMobile } from "../modules/app_configuration/featureFlags";
import UsedLibsListContainer from "../modules/legal/usedLibs/container_usedLibList";

interface NavbarProps {
  disabled: boolean;
}

const NavbarComponent: React.FC<NavbarProps> = ({ disabled }) => {
  const isMobileDevice = window.innerWidth <= 767;

  const uniqueCategories = Array.from(
    new Set(lessonsList.map((lesson) => lesson.category))
  );
  const navbarStyle = isMobileDevice
    ? { boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", paddingTop: "8vw" }
    : { boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" };

  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      fixed="top"
      style={navbarStyle}
    >
      <Container>
        <Navbar.Brand>
          <Container>
            <div className="d-flex align-items-center">
              <h5 className="m-0">{navbar_title}</h5>
            </div>
          </Container>
        </Navbar.Brand>
        <Navbar.Toggle className="ms-auto" aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {uniqueCategories.map((category) => {
              const categorySlug = category.toLowerCase().replace(/ /g, "-");
              return (
                <Nav.Link
                  key={categorySlug}
                  as={Link}
                  to={`/${categorySlug}`}
                  disabled={disabled}
                >
                  {category}
                </Nav.Link>
              );
            })}
          </Nav>
          <Nav>
          {featureFlag_DeployMobile && (
              <>
                <Nav.Link as={Link} to="/impressum" disabled={disabled}>
                  Impressum
                </Nav.Link>
                <Nav.Link as={Link} to="/datenschutz" disabled={disabled}>
                  Datenschutz
                </Nav.Link>
                <Nav.Link>
                  <UsedLibsListContainer />
                </Nav.Link>
              </>
            )}
            {isMobileDevice ? (
              <>
                <Nav.Link as={Link} to="/dashboard" disabled={disabled}>
                  Dashboard
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/dashboard" disabled={disabled}>
                <MdAccountCircle size="1.5vw" />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
