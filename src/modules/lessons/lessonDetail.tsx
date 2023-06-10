import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { MdArrowBack, MdCheckCircle } from 'react-icons/md';
import { MonacoDiffEditor } from 'react-monaco-editor';
import MonacoEditor from 'react-monaco-editor';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import NavbarComponent from '../../base/navbarComponent';
import htmlToReactParser from 'html-react-parser';
import parserBabel from 'prettier/parser-babel';
import parserCss from 'prettier/parser-postcss';
import { noCodeExampleCategories, showCodeExampleIDs,noCodeExampleIDs } from '../app_configuration/app_settings';



interface LessonProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    content: string;
    exercise: string;
    correctAnswer: string;
    language: string;
    category: string;
  };
}


const Lesson: React.FC<LessonProps> = ({ lesson }) => {
  // const shouldDisplaySolution = lesson.id !== '15' && lesson.id !== '16' && lesson.id !== '17' && lesson.id !== '18' && lesson.id !== '19' && lesson.id !== '20' && lesson.id !== '21' && parseInt(lesson.id) < 40 && lesson.id !== '55';
  const shouldDisplaySolution = showCodeExampleIDs.includes(lesson.id) ||
  !noCodeExampleCategories.includes(lesson.category) && !noCodeExampleIDs.includes(lesson.id) ||
  lesson.title.includes("Abschlussübung") && !noCodeExampleIDs.includes(lesson.id);





  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [completed] = useState<string[]>(JSON.parse(localStorage.getItem('completedLessons') || '[]'));
  const [showSolution, setShowSolution] = useState(false);
  const progressSavingEnabled = localStorage.getItem('progress-saving-enabled') === 'true';

  const parse = (code: string) => {
    try {
      return htmlToReactParser(code);
    } catch (error) {
      return code;
    }
  };


  const parseContentFunction = (code: string) => {
    const boldRegex = /<strong>(.*?)<\/strong>/g;
    const lines = code.split('<br />');
    const parsed = lines.map((line, index) => {
      let currentIndex = 0;
      const elements = [];
      let match = boldRegex.exec(line);
      while (match !== null) {
        const before = line.slice(currentIndex, match.index);
        if (before) {
          elements.push(before);
        }
        const text = match[1];
        elements.push(<strong key={index}>{text}</strong>);
        currentIndex = match.index + match[0].length;
        match = boldRegex.exec(line);
      }
      const remaining = line.slice(currentIndex);
      if (remaining) {
        elements.push(remaining);
      }
      return (
        <React.Fragment key={index}>
          {elements}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
    return parsed;
  };





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
      if (progressSavingEnabled) {
        const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
        completedLessons.push(lesson.id);
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
      }
    } else {
      alert('Falsch, versuchen Sie es später erneut! Unten sehen Sie nun die Lösung!');
      setIsAnswerCorrect(false);
    }
    setShowSolution(true);
  }, [code, lesson.correctAnswer, lesson.id, calculateSimilarity, progressSavingEnabled]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  const formatCode = useCallback(
    (code: string, language: string) => {
      try {
        let parser;
        // Determine the parser based on the language
        switch (language) {
          case 'html':
          case 'htmlCss':
          case 'htmlJs':
          case 'htmlCssJs':
            parser = 'html';
            break;
          case 'css':
            parser = 'css';
            break;
          case 'js':
            parser = 'babel';
            break;
          default:
            // fallback to HTML if language is not recognized
            parser = 'html';
        }

        return prettier.format(code, {
          parser: parser,
          plugins: [parserHtml, parserBabel, parserCss],
        });
      } catch (error) {
        console.error('Fehler beim Formatieren des Codes:', error);
        return code;
      }
    },
    []
  );





  const formattedCorrectAnswer = formatCode(lesson.correctAnswer, lesson.language);
  function removeHrefLinks(html: string): string {
    const regex = /href="(#|link1\.html|link2\.html|link3\.html)"/g;
    return html.replace(regex, '');
  }

  const handleCompleteLesson = useCallback(() => {
    if (progressSavingEnabled) {
      const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      completedLessons.push(lesson.id);
      localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
      setIsAnswerCorrect(true);
      let successLessonButton1 = document.getElementById('sucessLesson');
      if (successLessonButton1) {
        successLessonButton1.style.display = 'none';
      }
    }
  }, [lesson.id, progressSavingEnabled]);



  const parseHTML = (html: string) => parse(html);
  const parseContent = (html: string) => parseContentFunction(html);



  return (
    <div>
      <NavbarComponent disabled={false} />
      <div className="after-login-container">
        <Card style={{ width: '100vw' }}>
          <Card.Header as="h2">
            <MdArrowBack style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
            {lesson.title}
            {isAnswerCorrect && (
              <MdCheckCircle color="green" style={{ marginLeft: '10px', verticalAlign: 'middle' }} />
            )}
          </Card.Header>
          <Card.Body style={{ height: 'auto' }}>
            <Card.Text>{parseContent(lesson.content)}</Card.Text>
            {lesson.exercise !== '' && (
              <>
                <h3>Übung</h3>
                <Card.Text>{parseHTML(lesson.exercise)}</Card.Text>
              </>
            )}
            {lesson.exercise !== '' && (
              <>
                {shouldDisplaySolution && (
                  <>
                    <Card.Text>
                      <strong>Das Endergebnis soll wie folgt aussehen:</strong>
                    </Card.Text>

                    <iframe
                      title="Embedded Content"
                      srcDoc={removeHrefLinks(formattedCorrectAnswer)}
                      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
                      style={{ width: '70vw', height: '20vw' }}
                      onLoad={(event) => {
                        const iframe = event.target as HTMLIFrameElement;
                        const script = iframe.contentDocument?.querySelector('script');
                        if (script && iframe.contentDocument) {
                          const scriptContent = script.textContent;
                          const newScript = iframe.contentDocument.createElement('script');
                          if (iframe.contentDocument.body) {
                            iframe.contentDocument.body.appendChild(newScript);
                          }
                        }
                      }}
                    />






                    <br />
                  </>
                )}
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
            {lesson.exercise === '' && progressSavingEnabled && !completed.includes(lesson.id) && (
              <Button id='sucessLesson' variant="success" onClick={handleCompleteLesson}>
                Abgeschlossen
              </Button>
            )}
          </Card.Body>
        </Card>
        <br />
        <br />
        <br />
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
