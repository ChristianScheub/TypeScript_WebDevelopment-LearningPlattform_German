import React from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { MdCheckCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import './lessonOverview.css'; // Import the CSS file
import NavbarComponent from '../../base/navbarComponent';

interface LessonProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    content: string;
    exercise: string;
    correctAnswer: string;
  };
}

interface LessonOverviewProps {
  lessons: LessonProps['lesson'][];
  title: string;
}

const LessonOverview: React.FC<LessonOverviewProps> = ({ lessons, title }) => {
  const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <div>
      <NavbarComponent disabled={false} />
      <div className="lesson-overview-container after-login-container">
        <h2 className="lesson-overview-title">{title}</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {lessons.map((lesson) => (
            <Col key={lesson.id}>
              <div onClick={() => handleNavigation(lesson.id)} className="lesson-link">
                <Card className="lesson-card">
                  <Card.Body>
                    <Card.Title>
                      {lesson.title} {completed.includes(lesson.id) && <MdCheckCircle color="green" />}
                    </Card.Title>
                    <Card.Text>{lesson.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Badge bg="primary">Starten</Badge>
                  </Card.Footer>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default LessonOverview;
