import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import NavbarComponent from "../../base/navbarComponent";

interface DatenschutzProps {
  passwordEntered: boolean;
}

const Datenschutz: React.FC<DatenschutzProps> = ({ passwordEntered }) => {
  const navigate = useNavigate();

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
            <Card.Text>
              <b>
                This privacy policy is available in English under this German
                one (Our target market is currently Germany)
              </b>
              <br />
              <br />
              <h4>Datenschutzerklärung für Webseite</h4>
              <p>
                Vielen Dank für Ihren Besuch auf unserer Webseite. Wir legen
                großen Wert auf den Schutz Ihrer Daten und möchten Ihnen mit
                dieser Datenschutzerklärung einen groben Überblick darüber
                geben, wie wir Ihre Daten gemäß der Datenschutz-Grundverordnung
                (DSGVO), den europäischen Datenschutzgesetzen sowie dem
                California Consumer Privacy Act (CCPA) und kalifornischem Recht
                verarbeiten und schützen.
              </p>
              <h4>1. Verantwortliche Stelle</h4>
              <p>
                Verantwortlich für die Verarbeitung Ihrer Daten ist: Christian
                Scheub
                <br />
                Ziegel&auml;cker 56
                <br />
                71560 Sulzbach/Murr
                <br />
                <br />
                Kontakt Telefon: +49 176 21674883
                <br />
                Geschäftsführer/ Inhaber: Christian Scheub
                <br />
                Bei Fragen oder Anliegen zum Datenschutz können Sie uns gerne
                unter christian.developer.app@gmail.com kontaktieren. <br />
                Link zum Impressum:
                https://www.webentwicklung-lernen.de/impressum
              </p>
              <h4>2. Cookies, LocalStorage und SessionStorage</h4>
              <ul>
                <li>
                  Cookies: Cookies sind kleine Textdateien, die von einer
                  Webseite auf Ihrem Computer oder mobilen Gerät gespeichert
                  werden. Sie dienen dazu, Informationen über Ihren Besuch auf
                  der Webseite zu speichern, beispielsweise Ihre Einstellungen
                  oder Ihren Login-Status. Wir verwenden keine Cookies auf
                  unserer Webseite. (Deshalb müssen sie sich auch bei jedem
                  Aufruf neu einloggen)
                </li>
                <li>
                  LocalStorage: LocalStorage ist ein lokaler Speicher, der in
                  Ihrem Browser abgelegt wird. Er ermöglicht es Webseiten, Daten
                  auf Ihrem Gerät zu speichern, die auch nach dem Schließen des
                  Browsers erhalten bleiben. Wir verwenden keine
                  LocalStorage-Technologie auf unserer Webseite.
                </li>
                <li>
                  SessionStorage: SessionStorage ist ebenfalls ein lokaler
                  Speicher, der in Ihrem Browser abgelegt wird. Er funktioniert
                  ähnlich wie der LocalStorage, speichert jedoch nur Daten für
                  die Dauer Ihrer aktuellen Browsersitzung. Sobald Sie den
                  Browser schließen, werden die Daten gelöscht. Auf unserer
                  Webseite verwenden wir ausschließlich den Session Storage, um
                  temporäre Daten während Ihrer aktuellen Sitzung zu speichern.
                  Nach dem Schließen des Browsers werden diese Daten automatisch
                  gelöscht.
                </li>
              </ul>
              <p>
                Auf unserer Webseite verwenden wir ausschließlich den Session
                Storage zur Speicherung von Daten. Cookies, LocalStorage und
                andere Technologien werden von uns nicht verwendet.
              </p>
              <h4>3. Erhebung und Verarbeitung von Daten</h4>
              <p>
                Wir erheben und verarbeiten und speichern keinerlei Daten der
                Nutzer dieser Webseite.
              </p>
              <h4>4. Verkauf von Daten</h4>
              <p>
                Wir verkaufen keinerlei Ihrer Daten und erhalten auch keine über
                sie.
              </p>
              <h4>5. Ihre Rechte</h4>
              <p>
                Gemäß der DSGVO und des CCPA haben Sie verschiedene Rechte
                bezüglich Ihrer Daten. Sie haben das Recht auf Auskunft über die
                von uns verarbeiteten Daten, das Recht auf Berichtigung
                unrichtiger Daten, das Recht auf Löschung Ihrer Daten sowie das
                Recht auf Einschränkung der Verarbeitung. Darüber hinaus haben
                Sie das Recht auf Datenübertragbarkeit und das Recht, der
                Verarbeitung Ihrer Daten zu widersprechen. <br />
                Bitte beachten sie, da wir keine Daten über sie erhalten, diese
                Auskunft leer wäre und auch keine Daten folglich berichtigt oder
                gelöscht werden können.
              </p>
              <h4>6. Datensicherheit</h4>
              <p>
                Wir setzen nach Maßgabe des Art. 32 DSGVO unter Berücksichtigung
                des Stands der Technik technische und organisatorische Maßnahmen
                ein, um Ihre Daten vor Verlust, Missbrauch, unbefugtem Zugriff
                oder Offenlegung zu schützen. Unsere Sicherheitsmaßnahmen werden
                regelmäßig überprüft und an den aktuellen Stand der Technik
                angepasst.
              </p>
              <h4>7. Verwendete Begrifflichkeiten</h4>
              <p>
                „Personenbezogene Daten“ sind alle Informationen, die sich auf
                eine identifizierte oder identifizierbare natürliche Person (im
                Folgenden „betroffene Person“) beziehen; als identifizierbar
                wird eine natürliche Person angesehen, die direkt oder indirekt,
                insbesondere mittels Zuordnung zu einer Kennung wie einem Namen,
                zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung
                (z.B. Cookie) oder zu einem oder mehreren besonderen Merkmalen
                identifiziert werden kann, die Ausdruck der physischen,
                physiologischen, genetischen, psychischen, wirtschaftlichen,
                kulturellen oder sozialen Identität dieser natürlichen Person
                sind.
              </p>
              <p>
                „Verarbeitung“ ist jeder mit oder ohne Hilfe automatisierter
                Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im
                Zusammenhang mit personenbezogenen Daten. Der Begriff reicht
                weit und umfasst praktisch jeden Umgang mit Daten.
              </p>
              <p>
                Als „Verantwortlicher“ wird die natürliche oder juristische
                Person, Behörde, Einrichtung oder andere Stelle, die allein oder
                gemeinsam mit anderen über die Zwecke und Mittel der
                Verarbeitung von personenbezogenen Daten entscheidet,
                bezeichnet.
              </p>
              <h4>8. Änderungen dieser Datenschutzerklärung</h4>
              <p>
                Wir behalten uns das Recht vor, diese Datenschutzerklärung zu
                ändern, um den rechtlichen Anforderungen zu entsprechen oder
                Änderungen unserer Datenverarbeitungspraktiken widerzuspiegeln.
                Bitte überprüfen Sie diese Erklärung regelmäßig, um auf dem
                Laufenden zu bleiben.
              </p>
              <p>Datum: 16.07.2023</p>
              <br /> <br />
              <h4>Privacy Policy for Website</h4>
               <p>
                 Thank you for visiting our website. We lay
                 attaches great importance to the protection of your data and would like to share with you
                 This data protection declaration provides a rough overview of this
                 give how we use your data under the General Data Protection Regulation
                 (GDPR), the European data protection laws and the
                 California Consumer Privacy Act (CCPA) and California law
                 process and protect.
               </p>
               <h4>1. Responsible body</h4>
               <p>
                 Responsible for the processing of your data is: Christian
                 Scheub
                 <br />
                 Ziegelcker 56
                 <br />
                 71560 Sulzbach/Murr
                 <br />
                 <br />
                 Contact phone: +49 176 21674883
                 <br />
                 Managing director/ owner: Christian Scheub
                 <br />
                 If you have any questions or concerns about data protection, please feel free to contact us
                 contact at christian.developer.app@gmail.com. <br />
                 Link to the imprint:
                 https://www.webentwicklung-lernen.de/impressum
               </p>
               <h4>2. Cookies, LocalStorage and SessionStorage</h4>
               <ul>
                 <li>
                   Cookies: Cookies are small text files that are sent by a
                   website stored on your computer or mobile device
                   become. They are used to provide information about your visit
                   to save the website, for example your settings
                   or your login status. We do not use cookies on
                   our website. (That's why they have to register with everyone
                   log in again)
                 </li>
                 <li>
                   LocalStorage: LocalStorage is local storage built in
                   is stored in your browser. It allows websites, data
                   to save on your device, even after closing the
                   browser are preserved. We don't use any
                   LocalStorage technology on our website.
                 </li>
                 <li>
                   SessionStorage: SessionStorage is also a local one
                   Memory stored in your browser. It works
                   similar to the LocalStorage, but only stores data for
                   the duration of your current browser session. Once you do that
                   Close the browser, the data will be deleted. On our
                   Website we only use the session storage to
                   save temporary data during your current session.
                   After closing the browser, this data is saved automatically
                   turned off.
                 </li>
               </ul>
               <p>
                 On our website we only use the session
                 Storage for storing data. Cookies, LocalStorage and
                 other technologies are not used by us.
               </p>
               <h4>3. Collection and processing of data</h4>
               <p>
                 We do not collect, process or store any data
                 users of this website.
               </p>
               <h4>4. Sale of data</h4>
               <p>
                 We do not sell or receive any of your data
                 she.
               </p>
               <h4>5. Your rights</h4>
               <p>
                 Under the GDPR and CCPA, you have several rights
                 regarding your data. You have the right to information about the
                 data processed by us, the right to rectification
                 incorrect data, the right to have your data deleted and
                 Right to restriction of processing. In addition, have
                 You have the right to data portability and the right to
                 to object to the processing of your data. <br />
                 Please note that as we do not receive any data about you, these
                 Information would be empty and therefore no data corrected or
                 can be deleted.
               </p>
               <h4>6. Data Security</h4>
               <p>
                 In accordance with Art. 32 GDPR, we take into account
                 state-of-the-art technical and organizational measures
                 a to protect your data from loss, misuse, unauthorized access
                 or to protect disclosure. Our security measures will
                 checked regularly and kept up to date with the latest technology
                 adjusted.
               </p>
               <h4>7. Terms used</h4>
               <p>
                 “Personal Information” means any information relating to
                 an identified or identifiable natural person (in
                 refer to the following “data subject”; as identifiable
                 is considered to be a natural person who, directly or indirectly,
                 in particular by assignment to an identifier such as a name,
                 to an identification number, to location data, to an online identifier
                 (e.g. cookie) or one or more special features
                 can be identified, the expression of the physical,
                 physiological, genetic, psychological, economic,
                 cultural or social identity of that natural person
                 are.
               </p>
               <p>
                 "Processing" is any automated with or without assistance
                 Procedure performed operation or any such series of operations in
                 connection with personal data. The term is enough
                 wide and includes practically every handling of data.
               </p>
               <p>
                 The "responsible person" is the natural or legal
                 Person, authority, agency or other body acting alone or
                 together with others about the ends and means of
                 processing of personal data decides
                 designated.
               </p>
               <h4>8. Changes to this privacy policy</h4>
               <p>
                 We reserve the right to change this privacy policy
                 change to comply with legal requirements or
                 Reflect changes in our data processing practices.
                 Please check this statement regularly to stay up to date
                 to stay current.
               </p>
               <p>Date: 07/16/2023</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Datenschutz;
