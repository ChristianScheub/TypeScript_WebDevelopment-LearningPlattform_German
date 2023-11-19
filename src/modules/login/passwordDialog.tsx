import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './passwordDialog.css';
import { MD5 } from 'crypto-js';
import lessonsList from '../app_configuration/list_lessons';
import userAccountsList from '../app_configuration/accountList';
import { welcome_headline, welcome_description } from '../app_configuration/app_texts';
import { withoutUserLoginName,withoutUserLoginPW } from '../app_configuration/app_settings';


interface PasswordDialogProps {
  onPasswordEntered: () => void;
}

const PasswordDialog: React.FC<PasswordDialogProps> = ({ onPasswordEntered }) => {
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isDialogVisible, setIsDialogVisible] = useState(true);
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);

  const withoutUserLoginEnable =
  userAccountsList[0].userName === MD5(withoutUserLoginName).toString() &&
  userAccountsList[0].password === MD5(withoutUserLoginPW).toString();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (usernameRef.current && passwordRef.current) {
      handleLogin(usernameRef.current.value, passwordRef.current.value);
    } else {
      console.error('Refs are null');
    }
  };

  const handleWithoutLogin = () => {
    handleLogin(withoutUserLoginName, withoutUserLoginPW);
  };

  const handleLogin = (username: string, password: string) => {
    const passwordHash = MD5(password).toString();
    const usernameHash = MD5(username).toString();

    const matchedUser = userAccountsList.find(
      user => user.userName === usernameHash && user.password === passwordHash
    );

    if (matchedUser) {
      if (Date.now() > Date.parse(matchedUser.licenseDuration)) {
        alert('Ihre Lizenz ist bereits abgelaufen!');
      } else {
        onPasswordEntered();

        if (localStorage.getItem('username-saving-enabled') === 'true') {
          localStorage.setItem('idToken', matchedUser.idToken);
        }
        navigate(`/${lessonsList[0].category.toLowerCase().replace(/\s/g, '-')}`);
      }
    } else {
      handleWrongAttempt();
    }
  };

  const handleWrongAttempt = () => {
    setWrongAttempts(prevAttempts => prevAttempts + 1);
    const MAX_ATTEMPTS = 3;
    const LOCKOUT_DURATION = 30 * 1000;

    if (wrongAttempts + 1 >= MAX_ATTEMPTS) {
      setRemainingTime(LOCKOUT_DURATION);
      setIsDialogVisible(false);
      setTimeout(() => {
        setIsDialogVisible(true);
        setWrongAttempts(0);
      }, LOCKOUT_DURATION);
    }
    alert('Falscher Benutzername oder Passwort!');
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
      <div className="auth-container">
        <div className="description" style={{ textAlign: 'left' }}>
          <h3>{welcome_headline}</h3>
          <p>{welcome_description}</p>
          <p>Viel Spaß beim Lernen!</p>
        </div>
        {isDialogVisible ? (
          <div className="auth-card-container">
            <Card className="auth-card">
              <Card.Body>
                <Card.Title>Login</Card.Title>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Control
                      type="text"
                      placeholder="Benutzername"
                      name="username"
                      className="username-input"
                      ref={usernameRef}
                      data-testid="username-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Passwort"
                      name="password"
                      className="password-input"
                      ref={passwordRef}
                      data-testid="password-input" 
                    />
                  </Form.Group>
                  <br />
                  <Button type="submit" variant="primary" className="login-btn" data-testid="login-button" ref={loginButtonRef}>
                    Login
                  </Button>
                  {withoutUserLoginEnable && (
                    <Button type="button" variant="link" className="login-btn" data-testid="login-button-no-account" onClick={handleWithoutLogin}>
                      Kein Account?
                    </Button>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </div>
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
      </div>
    </div>
  );
};

export default PasswordDialog;
