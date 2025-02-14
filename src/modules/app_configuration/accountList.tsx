
             const generateIdToken = (): string => {
                 const idTokenBytes = new Uint8Array(16);
                 crypto.getRandomValues(idTokenBytes);
                 return Array.from(idTokenBytes)
                     .map((byte) => byte.toString(16).padStart(2, '0'))
                     .join('');
             };
             const userAccountsList =
             [{"id":"1","idToken":"generateIdToken()","userName":"1cb0c78fef6239036aca221239188f4d","password":"bc15f308b068911ccc0ac032af7ef9d4","description":"Willkommen zur Lernplattform! Sie haben sich eingeloggt ohne einen Account!     ","licenseDuration":"2100-01-01"},{"id":"2","idToken":"generateIdToken()","userName":"85b6a0f610223cfa7ee5c31dec89b1f0","password":"f2e256c2023fbc93207bde363e089478","description":"Dies ist der gemeinsame Account der Studierende an der DHBW Stuttgart.","licenseDuration":"2028-01-01"},{"id":"3","idToken":"generateIdToken()","userName":"4976e4fc591e6bc983f315a84e9c77d7","password":"8d4bb802868f42f5c1231e1d177727a8","description":"testAccount3","licenseDuration":"2023-09-15"}];export default userAccountsList;