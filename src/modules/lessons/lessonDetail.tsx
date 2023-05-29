import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import htmlToReactParser from 'html-react-parser';
import { Card, Button } from 'react-bootstrap';
import { MdArrowBack, MdCheckCircle } from 'react-icons/md';
import { MonacoDiffEditor } from 'react-monaco-editor';
import MonacoEditor from 'react-monaco-editor';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import ShadowDOM from 'react-shadow';
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

const Lesson: React.FC<LessonProps> = ({ lesson }) => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [completed] = useState<string[]>(JSON.parse(localStorage.getItem('completedLessons') || '[]'));
  const [showSolution, setShowSolution] = useState(false);

  const parse = useCallback(
    (code: string) => {
      try {
        return htmlToReactParser(code, {
          replace: (domNode) => {
            if (domNode.type === 'tag' && 'name' in domNode && domNode.name === 'br') {
              return <br />;
            }
            return domNode;
          },
        });
      } catch (error) {
        return code;
      }
    },
    []
  );

  useEffect(() => {
    if (completed.includes(lesson.id)) {
      setIsAnswerCorrect(true);
    }
  }, [lesson.id, completed]);

  const calculateSimilarity = useCallback((str1: string, str2: string): number => {
    const matrix = [];

    let i, j;

    for (i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (i = 1; i <= str2.length; i++) {
      for (j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
        }
      }
    }

    const similarity = 1 - matrix[str2.length][str1.length] / Math.max(str1.length, str2.length);

    return similarity;
  }, []);

  const checkAnswer = useCallback(() => {
    const userAnswer = String(code).replace(/\s/g, '');
    const correctAnswer = String(lesson.correctAnswer).replace(/\s/g, '');

    const similarity = calculateSimilarity(userAnswer, correctAnswer) * 100;
    if (similarity >= 90) {
      alert(`Ihr Code ist zu ${similarity.toFixed(2)}% korrekt! Glückwunsch!`);
      setIsAnswerCorrect(true);
      if (localStorage.getItem('progress-saving-enabled') === 'true') {
        const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
        completedLessons.push(lesson.id);
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
      }
    } else {
      alert('Falsch, versuchen Sie es später erneut! Unten sehen Sie nun die Lösung!');
      setIsAnswerCorrect(false);
    }
    setShowSolution(true);
  }, [code, lesson.correctAnswer, lesson.id, calculateSimilarity]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  const formatCode = useCallback(
    (code: string) => {
      try {
        return prettier.format(code, {
          parser: 'html',
          plugins: [parserHtml],
        });
      } catch (error) {
        console.error('Fehler beim Formatieren des Codes:', error);
        return code;
      }
    },
    []
  );

  const formattedCorrectAnswer = formatCode(lesson.correctAnswer);

  return (
    <div>
            <NavbarComponent disabled={false}/>
    <div className="after-login-container">
      <Card style={{ width: '100vw' }}>
        <Card.Header as="h2">
          <MdArrowBack style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
          {lesson.title}
          {isAnswerCorrect && <MdCheckCircle color="green" />}
        </Card.Header>
        <Card.Body style={{ height: 'auto' }}>
          <Card.Text>{parse(lesson.content)}</Card.Text>
          {lesson.exercise !== '' && (
            <>
              <h3>Übung</h3>
              <Card.Text>{parse(lesson.exercise)}</Card.Text>
            </>
          )}
          {lesson.exercise !== '' && (
            <>
              <Card.Text>
                <strong>Das Endergebnis soll wie folgt aussehen:</strong>
              </Card.Text>

              <ShadowDOM.div>
                <div>{parse(formattedCorrectAnswer)}</div>
              </ShadowDOM.div>
              <br />
              <br />
              <MonacoEditor
                width="100%"
                height="300px"
                language="html"
                theme="vs-dark"
                value={code}
                onChange={handleCodeChange}
              />
              <br />
              <Button variant="primary" onClick={checkAnswer}>
                Überprüfen
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
      <br /><br /><br />
      {showSolution && (
        <Card style={{ width: '100vw' }}>
          <Card.Header as="h2">Lösung</Card.Header>
          <Card.Body style={{ height: 'auto' }}>
            <Card.Text>Hier wird die Lösung (links) mit Ihrem Code (rechts) verglichen. </Card.Text>

            <MonacoDiffEditor
              width="100%"
              height="300px"
              language="html"
              theme="vs-dark"
              original={formattedCorrectAnswer}
              value={code}
              options={{
                readOnly: true,
                renderSideBySide: true,
                automaticLayout: true,
              }}
            />
          </Card.Body>
        </Card>
      )}
    </div>
    </div>
  );
};

export default Lesson;
