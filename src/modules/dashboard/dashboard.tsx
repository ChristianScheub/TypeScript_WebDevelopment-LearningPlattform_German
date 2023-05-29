import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import lessonsList from '../lessons/list_lessons';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../../base/navbarComponent';
import userAccountsList from '../login/accountList';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const idToken = localStorage.getItem('idToken') || '';
  const currentUserAccount = userAccountsList.find((user) => user.idToken === idToken);

  const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]').length;
  const totalLessons = lessonsList.filter((lesson) => lesson.exercise !== '').length;
  const pendingLessons = totalLessons - completedLessons;
  const progress = Math.round((completedLessons / totalLessons) * 100);

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
                <strong>Name: </strong> {currentUserAccount.userName}
              </Card.Text>
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
        <br/>

        <Card style={{ width: '100vw'}}>
          <Card.Header as="h2">
            Ihr Fortschritt
          </Card.Header>

          <Card.Body>
            <ProgressBar now={progress} label={`${progress}%`} />
            <Card.Text>
              Erfolgreich abgeschlossene Lektionen: {completedLessons}/{totalLessons}
            </Card.Text>
            <Card.Text>Ausstehende Lektionen: {pendingLessons}</Card.Text>
          </Card.Body>
        </Card>
        {/* Weitere Karten oder Informationen hier hinzufügen */}
      </div>
    </div>
  );
};

export default Dashboard;
