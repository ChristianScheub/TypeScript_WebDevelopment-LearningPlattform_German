import Dashboard from './modules/dashboard/dashboard';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, useLocation, Route, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import FooterComponent from './base/footerComponent';
import { website_title } from './modules/app_configuration/app_texts';
import NavbarComponent from './base/navbarComponent';
import LessonsRoutes from './modules/lessons/lessonsRoutes';
import Impressum from './modules/legal/impressum';
import Datenschutz from './modules/legal/datenschutz';
import CookieConsentBanner from './modules/legal/cookieConsentBanner';
import PasswordDialog from './modules/login/passwordDialog';

export interface PasswordRedirectProps {
  passwordEntered: boolean;
}

const PasswordRedirect: React.FC<PasswordRedirectProps> = ({ passwordEntered }) => {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  useEffect(() => {
    if (
      !passwordEntered &&
      currentLocation.pathname !== '/password' &&
      currentLocation.pathname !== '/impressum' &&
      currentLocation.pathname !== '/datenschutz'
    ) {
      navigate('/password');
    }
  }, [passwordEntered, navigate]);

  return null;
};

const App: React.FC = () => {
  const [passwordEntered, setPasswordEntered] = useState(false);

  const handlePasswordEntered = () => {
    setPasswordEntered(true);
  };


  useEffect(() => {
    document.title = website_title;
  }, []);

  return (
    <Router>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <NavbarComponent disabled={!passwordEntered} />

        <PasswordRedirect passwordEntered={passwordEntered} />
        <Container className="custom-container" style={{ paddingBottom: '80px' }}>
          <main>
            <Routes>
              {passwordEntered && (
                <>
                  <Route path="/*" element={<LessonsRoutes />} />
                  <Route path="/dashboard" element={<Dashboard />} />

                </>
              )}
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route
                path="/password"
                element={<PasswordDialog onPasswordEntered={handlePasswordEntered} />}
              />

            </Routes>
          </main>
        </Container>
        <CookieConsentBanner />
        <FooterComponent />
      </div>
    </Router>
  );
};

export default App;
