import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FooterComponent from '../../base/footerComponent';
import './passwordDialog.css';
import NavbarComponent from '../../base/navbarComponent';
import { MD5 } from 'crypto-js';

interface UserAccount {
  id: string;
  idToken: string;
  userName: string;
  password: string;
  description: string;
  licenseDuration: string;
}

interface PasswordDialogProps {
  onPasswordEntered: () => void;
  userAccountsList: UserAccount[];
}

const PasswordDialog: React.FC<PasswordDialogProps> = ({ onPasswordEntered, userAccountsList }) => {
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isDialogVisible, setIsDialogVisible] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userName = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;

    // Convert the entered password to MD5 hash
    const passwordHash = MD5(password).toString();

    const matchedUser = userAccountsList.find(
      user => user.userName === userName && user.password === passwordHash
    );

    if (matchedUser) {
      const currentTimestamp = Date.now();
      const licenseExpiration = Date.parse(matchedUser.licenseDuration);

      if (currentTimestamp > licenseExpiration) {
        alert('Ihre Lizenz ist bereits abgelaufen!');
      } else {
        onPasswordEntered();

        if (localStorage.getItem('username-saving-enabled') === 'true') {
          localStorage.setItem('idToken', matchedUser.idToken);
        }

        navigate('/grundlagen-kurse');
      }
    } else {
      setWrongAttempts(prevAttempts => prevAttempts + 1);
      const MAX_ATTEMPTS = 3;
      const LOCKOUT_DURATION = 30 * 1000; // 30 seconds

      if (wrongAttempts + 1 >= MAX_ATTEMPTS) {
        setRemainingTime(LOCKOUT_DURATION);
        setIsDialogVisible(false);
        setTimeout(() => {
          setIsDialogVisible(true);
          setWrongAttempts(0);
        }, LOCKOUT_DURATION);
      }
      alert('Falscher Benutzername oder Passwort!');
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1000);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [remainingTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <NavbarComponent disabled={true} />
      <div className="auth-container">
        <div className="description" style={{ textAlign: 'left' }}>
          <h3>Willkommen zur Webentwicklungslernplattform!</h3>
          <p>
            Hier finden Sie Unterrichtseinheiten über HTML, CSS und allgemeine Webentwicklung. Die Plattform bietet
            zahlreiche Coding-Übungen mit einem Live-Editor und einer Überprüfung der Aufgaben. Zusätzlich gibt es ein
            Dashboard, das Ihren Lernfortschritt anzeigt.
          </p>
          <p>Viel Spaß beim Lernen!</p>
        </div>
        {isDialogVisible ? (
          <>
            <div className="auth-card-container">
              <Card className="auth-card">
                <Card.Body>
                  <Card.Title>Password Eingabe</Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicUsername">
                      <Form.Control type="text" placeholder="Benutzername" name="username" className="username-input" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        placeholder="Passwort"
                        name="password"
                        className="password-input"
                      />
                    </Form.Group>
                    <br />
                    <Button type="submit" variant="primary" className="login-btn">
                      Login
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </>
        ) : (
          <div className="auth-card-container">
            <Card className="auth-card">
              <Card.Body>
                <Card.Title>Zu viele falsche Versuche!</Card.Title>
                <p>Bitte warten Sie für {formatTime(remainingTime)} bevor Sie es erneut versuchen.</p>
              </Card.Body>
            </Card>
          </div>
        )}
        <FooterComponent />
      </div>
    </div>
  );
};

export default PasswordDialog;