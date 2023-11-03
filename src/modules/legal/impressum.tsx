import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import NavbarComponent from '../../base/navbarComponent';
import { impressum_text } from '../app_configuration/app_texts';
import CodeToTextParser from './codeToTextParser';




interface ImpressumProps {
  passwordEntered: boolean;
}


const Impressum: React.FC<ImpressumProps> = ({ passwordEntered }) => {
  const navigate = useNavigate();

  return (
    <div>
      <NavbarComponent disabled={!passwordEntered} />
      <div className="after-login-container">
        <Card className="mb-3">
          <Card.Header as="h2">
            <MdArrowBack style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} data-testid="backButton" />
            Impressum
          </Card.Header>
          <Card.Body>
            <CodeToTextParser code={impressum_text} />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Impressum;