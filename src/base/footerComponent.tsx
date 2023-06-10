import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { footer_text} from '../modules/app_configuration/app_texts';


const FooterComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'underline',
    padding: '0 5px',
  };

  const footerStyle: React.CSSProperties = {
    backgroundColor: '#343a40',
    color: '#fff',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: '4vw',
    lineHeight: '4vw',
    textAlign: 'center',
    zIndex: 100,
  };

  const mobileStyle: React.CSSProperties = {
    height: '15vw',
    lineHeight: '6vw',
  };

  return (
    <Container
      fluid
      style={Object.assign({}, footerStyle, window.innerWidth <= 767 ? mobileStyle : {})}
    >
      {footer_text}
      
      <span onClick={() => handleNavigation('/impressum')} style={linkStyle}>
        Impressum
      </span>{' '}
      |
      <span onClick={() => handleNavigation('/datenschutz')} style={linkStyle}>
        Datenschutz
      </span>
    </Container>
  );
};

export default FooterComponent;