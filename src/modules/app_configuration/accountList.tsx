
             const generateIdToken = (): string => {
                 const idTokenBytes = new Uint8Array(16);
                 crypto.getRandomValues(idTokenBytes);
                 return Array.from(idTokenBytes)
                     .map((byte) => byte.toString(16).padStart(2, '0'))
                     .join('');
             };
             const userAccountsList =
             [{"id":"1","idToken":"generateIdToken()","userName":"1cb0c78fef6239036aca221239188f4d","password":"bc15f308b068911ccc0ac032af7ef9d4","description":"Willkommen zur Lernplattform! Sie haben sich eingeloggt ohne einen Account! Dies ist nur bis zu dem 15.07.2023 noch möglich.     ","licenseDuration":"2023-07-15"},{"id":"2","idToken":"generateIdToken()","userName":"2fbc4dcfa1c9c7a5508b45a5a07feaf2","password":"2fbc4dcfa1c9c7a5508b45a5a07feaf2","description":"testAccount2","licenseDuration":"2023-07-15"},{"id":"3","idToken":"generateIdToken()","userName":"4976e4fc591e6bc983f315a84e9c77d7","password":"4976e4fc591e6bc983f315a84e9c77d7","description":"testAccount3","licenseDuration":"2023-07-15"}];export default userAccountsList;