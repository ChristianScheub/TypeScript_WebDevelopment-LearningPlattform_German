import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './cookieConsentBanner.css';

const CookieConsentBanner: React.FC = () => {
  const [isCookieAccepted, setIsCookieAccepted] = useState<boolean>(false);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(true);
  const [isProgressSavingEnabled, setIsProgressSavingEnabled] = useState<boolean>(true);
  const [isUsernameSavingEnabled, setIsUsernameSavingEnabled] = useState<boolean>(true);


  const onAccept = () => {
    setIsCookieAccepted(true);
    setIsPopupVisible(false);
    localStorage.setItem('progress-saving-enabled', "true");
    localStorage.setItem('username-saving-enabled', "true");
  };

  const onDeclineAll = () => {
    localStorage.removeItem('completedLessons');
    localStorage.removeItem('progress-saving-enabled');
    localStorage.removeItem('username-saving-enabled');
    setIsPopupVisible(false);
    setIsCookieAccepted(true);
  };

  const onSaveSettings = () => {
    setIsPopupVisible(false);
    if(isProgressSavingEnabled){
      localStorage.setItem('progress-saving-enabled', String(isProgressSavingEnabled));
    }
    else if(isUsernameSavingEnabled){
      localStorage.setItem('username-saving-enabled', String(isUsernameSavingEnabled));
    }
    if(isProgressSavingEnabled || isUsernameSavingEnabled){
      setIsCookieAccepted(true);
    }
    else{
      setIsCookieAccepted(true);
      onDeclineAll();
    }
  };

  const onCustomizeSettings = () => {
    setIsPopupVisible(false);
  };

  if (isCookieAccepted) {
    return null;
  }

  return (
    <>
      {isPopupVisible && (
        <Modal show={true} centered>
          <Modal.Header>
            <Modal.Title>Lokale Daten Speicherung</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="cookie-overlay-content">
              <div className="cookie-overlay-text">
                Diese Website verwendet den lokalen Speicher, um Ihren Fortschritt in den Unterrichtseinheiten, Ihren Benutzernamen sowie Ihr Einverständnis hierzu lokal in Ihrem Browser zu speichern. <br /> Es werden allerdings keine Cookies gespeichert und keine Daten an unsere Server versendet, da diese Webanwendung ohne einen zusätzlichen Server von uns funktioniert. <br /> Klicken Sie auf "Einstellungen anpassen", um einzeln auszuwählen, was lokal gespeichert wird, oder auf "Alle ablehnen", falls Sie damit nicht einverstanden sind. <br /> Falls Sie nicht einverstanden sind, funktionieren einzelne Funktionen wie das Dashboard oder der Lernfortschritt nicht.
              <br />
                <a href="https://www.webentwicklung-lernen.de/impressum">
                  Impressum
                </a>     <br />
                <a href="https://www.webentwicklung-lernen.de/datenschutz">
                  Datenschutz
                </a>
              </div>
              <div className="button-group">
                <Button variant="primary" onClick={onAccept} style={{ margin: '0 0.5vw' }}>
                  Alle akzeptieren
                </Button>
                <Button variant="outline-danger" onClick={onDeclineAll} style={{ margin: '0 0.5vw' }}>
                  Alle ablehnen
                </Button>
                <Button variant="outline-primary" onClick={onCustomizeSettings} style={{ margin: '0 0.5vw' }}>
                  Einstellungen anpassen
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {!isPopupVisible && (
        <Modal show={true} centered>
          <Modal.Header>
            <Modal.Title>Cookie-Einstellungen anpassen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="cookie-overlay-text">
              Pro Einstellung werden zwei Werte im LocalStorage in Ihrem Browser gespeichert. Einmal dass Sie mit der Speicherung einverstanden sind und zusätzlich der Wert für die jeweilige Einstellung.
            </div>
            <Form>
              <Form.Group controlId="formProgressSaving">
                <Form.Check
                  type="checkbox"
                  label="Aktuellen Lernfortschritt speichern"
                  checked={isProgressSavingEnabled}
                  onChange={() => setIsProgressSavingEnabled(prevState => !prevState)}
                />
              </Form.Group>
              <Form.Group controlId="formUsernameSaving">
                <Form.Check
                  type="checkbox"
                  label="Username speichern"
                  checked={isUsernameSavingEnabled}
                  onChange={() => setIsUsernameSavingEnabled(prevState => !prevState)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsPopupVisible(true)}>
              Abbrechen
            </Button>
            <Button variant="primary" onClick={onSaveSettings}>
              Speichern
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default CookieConsentBanner;
