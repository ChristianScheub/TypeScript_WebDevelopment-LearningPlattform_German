import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import NavbarComponent from '../../base/navbarComponent';
import { impressum_text} from '../app_configuration/app_texts';




interface ImpressumProps {
  passwordEntered: boolean;
}


const Impressum: React.FC<ImpressumProps> = ({ passwordEntered }) => {
  const navigate = useNavigate();


  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <NavbarComponent disabled={!passwordEntered}/>


      <div className="after-login-container">

        <Card className="mb-3">
          <Card.Header as="h2">
            <MdArrowBack style={{ cursor: 'pointer' }} onClick={handleBackClick} />
            Impressum
          </Card.Header>
          <Card.Body>
            <Card.Text>
            {impressum_text.split('<br />').map((text, index) => (
                <React.Fragment key={index}>
                  {text}
                  <br />
                </React.Fragment>
              ))}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

    </div>
  );
};

export default Impressum;