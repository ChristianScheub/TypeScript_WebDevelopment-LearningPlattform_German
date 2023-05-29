import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const FooterComponent: React.FC = () => {
  const navigate = useNavigate();


  const handleNavigation = (route: string) => {
      navigate(route);
  };

  const linkStyle = {
    color: '#fff', 
    textDecoration: 'underline',
    padding: '0 5px'
  };

  return (
    <Container fluid style={{
      backgroundColor: '#343a40',
      color: '#fff',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      height: '4vw',
      lineHeight: '4vw',
      textAlign: 'center',
      zIndex: 100
    }}>
      © 2023 Christian Scheub. All rights reserved.
      <span onClick={() => handleNavigation("/impressum")} style={linkStyle}>Impressum</span> | 
      <span onClick={() => handleNavigation("/datenschutz")} style={linkStyle}>Datenschutz</span>
    </Container>
  );
};

export default FooterComponent;
