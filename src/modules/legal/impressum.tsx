import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import NavbarComponent from '../../base/navbarComponent';



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
              Angaben gem. § 5 TMG:
              <br />
              Christian Scheub
              <br />
              Ziegeläcker 56
              <br />
              71560 Sulzbach an der Murr
            </Card.Text>
            <Card.Text>
              Kontaktaufnahme:
              <br />
              Telefon: +49 176 21674883
              <br />
              E-Mail: christian.scheub@gmail.com
            </Card.Text>
            <Card.Text>
              Urheberrecht:
              <br />
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
              Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen
              der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
              privaten, nicht kommerziellen Gebrauch gestattet.
              <br />
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.
              Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung
              aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir
              derartige Inhalte umgehend entfernen.
            </Card.Text>
            {/* Other sections of the Impressum go here */}
            {/* Haftungsausschluss – Disclaimer */}
            {/* Haftungsbeschränkung für externe Links */}
            {/* Urheberrecht */}
            {/* Please refer to the provided template to fill in these sections */}
          </Card.Body>
        </Card>
      </div>

    </div>
  );
};

export default Impressum;