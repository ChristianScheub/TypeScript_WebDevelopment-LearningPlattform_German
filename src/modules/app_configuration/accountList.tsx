const generateIdToken = (): string => {
    const idTokenBytes = new Uint8Array(16);
    crypto.getRandomValues(idTokenBytes);
    return Array.from(idTokenBytes)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  };
  
  const userAccountsList = [
//User one is always the user when somebody have no login credentials
    {
      id: '1',
      idToken: generateIdToken(),
      userName: '1cb0c78fef6239036aca221239188f4d',
      password: 'bc15f308b068911ccc0ac032af7ef9d4',
      description: 'Willkommen zur Webentwicklungslernplattform! Sie haben sich eingeloggt ohne einen Account! Dies ist nur bis zu dem 15.06.2023 noch möglich.     ',
      licenseDuration: '2023-07-15',
    },
    {
      id: '2',
      idToken: generateIdToken(),
      userName: '21232f297a57a5a743894a0e4a801fc3',
      password: '738791c89cea36ffd51ad38421bf7622',
      description: 'Lerne wie eine HTML Seite strukturiert ist',
      licenseDuration: '2029-08-01',
    },
    {
      id: '3',
      idToken: generateIdToken(),
      userName: '149603e6c03516362a8da23f624db945',
      password: 'e67c10a4c8fbfc0c400e047bb9a056a1',
      description: 'Lerne wie eine HTML Seite strukturiert ist',
      licenseDuration: '2022-08-01',
    },
    {
        id: '4',
        idToken: generateIdToken(),
        userName: 'e0d9e4defddbfd4c44402f0a2d68b279',
        password: 'f8b2b6f48af1148eb8d1d2e385d547d3',
        description: 'Willkommen zum Account für die Webentwicklungslernplattform der DHBW-Studenten! Hier haben Sie Zugriff auf eine speziell für Ihre Webentwicklungsvorlesung entwickelte Plattform. Mit interaktiven Lektionen, praxisorientierten Tutorials und einem Fortschrittsdashboard können Sie Ihre Webentwicklungsfähigkeiten verbessern. Entdecken Sie die spannende Welt der Webentwicklung und entwickeln Sie sich weiter. Wir freuen uns, Sie auf Ihrem Weg zur erfolgreichen Webentwicklung zu begleiten!        ',
        licenseDuration: '2023-08-01',
      },
  ];
  
  export default userAccountsList;
  