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
  getProgressByCategoryIn1000
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
  const progressByCategoryIn1000 = getProgressByCategoryIn1000();

  const combinedProgress = progressByCategory.map((progress, index) => ({
    ...progress,
    completedXP: progressByCategoryIn1000[index].completed,
    pendingXP: progressByCategoryIn1000[index].pending,
    totalXP: progressByCategoryIn1000[index].total,
  }));

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
              {combinedProgress.map(({ category, completed, completedXP, pending, pendingXP, total, totalXP }) => {
      return (
        <div key={category}>
          <Card.Text>
            <strong>{category} Einheiten:</strong>
            <ProgressBar now={completed} max={total} label={`${completed} / ${total}`} />
            <Card.Text>Erfolgreich abgeschlossene Einheiten: {completed} (XP: {completedXP})</Card.Text>
            <Card.Text>Ausstehende Einheiten: {pending} (XP: {pendingXP})</Card.Text>
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