import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import NavbarComponent from "../../base/navbarComponent";
import { datenschutz_text } from "../app_configuration/app_texts";

interface DatenschutzProps {
  passwordEntered: boolean;
}

const Datenschutz: React.FC<DatenschutzProps> = ({ passwordEntered }) => {
  const navigate = useNavigate();


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

  return (
    <div>
      <NavbarComponent disabled={!passwordEntered} />
      <div className="after-login-container">
        <Card className="mb-3">
          <Card.Header as="h2">
            <MdArrowBack
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Unsere Datenschutzerklärung:
          </Card.Header>
          <Card.Body>
            <Card.Text>{parseContentFunction(datenschutz_text)}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Datenschutz;
