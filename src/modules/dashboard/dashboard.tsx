import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import lessonsList from '../app_configuration/list_lessons';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../../base/navbarComponent';
import userAccountsList from '../app_configuration/accountList';
import {
  getProgressByCategory,
  xpValueOfCompletedLessonInCategory,
} from "./categoryProgress";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const idToken = localStorage.getItem('idToken') || '';
  const currentUserAccount = userAccountsList.find(user => user.idToken === idToken);
  const progressEnabled = localStorage.getItem('progress-saving-enabled') != null;

  const completedLessons: string[] = JSON.parse(localStorage.getItem('completedLessons') || '[]');
  const totalLessons: number = lessonsList.length;
  const pendingLessons: number = totalLessons - completedLessons.length;
  const progress: number = Math.round((completedLessons.length / totalLessons) * 100);
  const progressByCategory = getProgressByCategory();

  return (
    <div>
      <NavbarComponent disabled={false} />

      <div className="after-login-container">
        {currentUserAccount && (
          <Card style={{ width: '100vw', top: '2vw' }}>
            <Card.Header as="h2">
              <MdArrowBack style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
              Konto Informationen
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Beschreibung: </strong> {currentUserAccount.description}
              </Card.Text>
              <Card.Text>
                <strong>Lizenzdauer: </strong> {currentUserAccount.licenseDuration}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
        <br />
        <br />
        <br />
        <br />
        {progressEnabled && (
          <Card style={{ width: '100vw' }}>
            <Card.Header as="h2">Ihr Fortschritt</Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Gesamt Überblick:</strong>
                <ProgressBar now={progress} label={`${progress}%`} />
                <Card.Text>
                  Erfolgreich abgeschlossene Lektionen: {completedLessons.length}/{totalLessons}
                </Card.Text>
                <Card.Text>Ausstehende Lektionen: {pendingLessons}</Card.Text>
              </Card.Text>
              <br />
              {progressByCategory.map(({ category, completed, pending, total }) => {
                const xpValue = xpValueOfCompletedLessonInCategory(category);
                return (
                  <div key={category}>
                    <Card.Text>
                      <strong>{category} Einheiten:</strong>
                      <ProgressBar now={completed} max={total} label={`${completed} / ${total}`} />
                      <Card.Text>Erfolgreich abgeschlossene Einheiten: {completed} (XP: {completed * xpValue})</Card.Text>
                      <Card.Text>Ausstehende Einheiten: {pending} (XP: {pending * xpValue})</Card.Text>
                      <br />
                    </Card.Text>
                  </div>
                );
              })}
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
