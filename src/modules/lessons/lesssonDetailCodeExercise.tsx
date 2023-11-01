import React from 'react';
import { Card, Button } from 'react-bootstrap';
import MonacoEditor from 'react-monaco-editor';
import { possibleLinksToReplace } from "../app_configuration/app_settings";


interface ExerciseComponentProps {
  lesson: {
    exercise: string;
    language: string;
  };
  showSolution: boolean;
  codeSolution: string;
  code: string;
  handleCodeChange: (value: string) => void;
  checkAnswerCode: () => void;
}

function removeHrefLinks(html: string): string {
    const linkRegex = possibleLinksToReplace.map((link) =>
      link.replace(".", "\\.")
    );
    const regex = new RegExp(`href="(#[^"]*|${linkRegex.join("|")})"`, "g");
    return html.replace(regex, "");
  }

const CodeEditor: React.FC<ExerciseComponentProps> = ({
  lesson,
  showSolution,
  codeSolution,
  code,
  handleCodeChange,
  checkAnswerCode,
}) => {
  if (lesson.exercise===""&&codeSolution==="") {
    return null;
  }

  
  return (
    <>
      {showSolution && (
        <>
          <Card.Text>
            <strong>Das Endergebnis soll wie folgt aussehen:</strong>
          </Card.Text>
          <iframe
            title="Embedded Content"
            srcDoc={removeHrefLinks(codeSolution)}
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
            style={{ width: '70vw' }}
            onLoad={(event) => {
              const iframe = event.target as HTMLIFrameElement;
              if (iframe.contentWindow?.document.body) {
                const newHeight =
                  iframe.contentWindow.document.body.scrollHeight +
                  3 * window.innerWidth * 0.01; // 2vw in Pixel umrechnen
                iframe.height = `${newHeight}px`;
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
        language={lesson.language}
        theme="vs-dark"
        value={code}
        onChange={handleCodeChange}
      />
      <br />
      <Button variant="primary" onClick={checkAnswerCode}>
        Überprüfen
      </Button>
    </>
  );
};

export default CodeEditor;