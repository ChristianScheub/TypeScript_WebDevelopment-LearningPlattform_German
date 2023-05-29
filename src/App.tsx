import Dashboard from './modules/dashboard/dashboard';
import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes,useLocation, Route, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Lesson from './modules/lessons/lessonDetail';
import LessonOverview from './modules/lessons/lessonOverview';
import FooterComponent from './base/footerComponent';
import lessonsList from './modules/lessons/list_lessons';
import userAccountsList from './modules/login/accountList';

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
      navigate('/password'); // Redirect to password page
    }
  }, [passwordEntered, navigate]);

  return null;
};

const App: React.FC = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState(false);

  const handlePasswordEntered = () => {
    setPasswordEntered(true);
  };

  const hidePasswordDialog = () => {
    setPasswordEntered(true);
  };

  return (
    <Router>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <PasswordRedirect passwordEntered={passwordEntered} />
        <Container className="custom-container" style={{ paddingBottom: '80px' }}>
          <main>
            <Routes>
              {passwordEntered && (
                <>
                  {lessonsList.map((lesson) => (
                    <Route key={lesson.id} path={`/${lesson.id}`} element={<Lesson lesson={lesson} />} />
                  ))}
                  <Route path="/html-kurse" element={<LessonOverview title="HTML Einheiten" lessons={lessonsList.slice(0, 12)} />} />
                  <Route path="/css-kurse" element={<LessonOverview title="CSS Einheiten" lessons={lessonsList.slice(12, 24)} />} />
                  <Route path="/grundlagen-kurse" element={<LessonOverview title="Allgemeine Webentwicklungs Einheiten" lessons={lessonsList.slice(24, 39)} />} />
                  <Route path="/" element={<LessonOverview title="Allgemeine Webentwicklungs Einheiten" lessons={lessonsList.slice(24, 39)} />} />
                </>
              )}
              <Route path="/impressum" element={<Impressum passwordEntered={passwordEntered} />} />
              <Route path="/datenschutz" element={<Datenschutz passwordEntered={passwordEntered} />} />
              <Route path="/password" element={<PasswordDialog onPasswordEntered={handlePasswordEntered} userAccountsList={userAccountsList} />} />

              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </Container>
        <CookieConsentBanner />
        <FooterComponent  />

      </div>
    </Router>
  );
};

export default App;
