# WebEntwicklungReactApp

Last Edit: 11.2023 <br>
Language: Typescript React Web App<br>
Azure Web-App: https://proud-pebble-024572f10.3.azurestaticapps.net/<br>
Azure Web App with Google Domain: https://www.webentwicklung-lernen.de/

This is a Typescript React app designed to teach the basics of web development. It runs entirely locally on the client and does not require a backend, just a server on which the web app is hosted. This is intended as a companion to my web development lecture, so students will receive an account as part of this to review the material afterwards.
<br>Please note that I use an Azure Pipline to synchronize my Azure Dev Ops repo, which is why there are a lot of commits and no different branches.

<br><br><br>

Deutsche Kurzbeschreibung:
Das ist eine Typescript React App, welche die Grundlagen der Webentwicklung vermitteln soll. Sie läuft komplett lokal auf dem Client und benötigt kein Backend, lediglich einen Server auf welchem die Web-App gehostet wird. Diese ist gedacht als Begleitmaterial zu meiner Webentwicklungsvorlesung, dementsprechend erhalten die Studenten als Teil dieser einen Account um anschließend den Stoff zu wiederholen.
<br>Bitte beachten Sie, dass ich eine Azure Pipline verwende um mein Azure Dev Ops Repo zu synchronisiere, weshalb es sehr viele Commits gibt und keine verschiedenen Branches.

## Testing
The Jest testing framework is used for testing.
The tests here are always written in Typescript.

Due to problems of the JavaScript testing framework Jest with the monaco-editor not all parts are covered by the tests.



File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s   
---------------------------|---------|----------|---------|---------|---------------------
All files                  |   91.52 |    74.76 |   83.33 |   92.09 |                     
 base                      |   82.35 |       50 |   57.14 |   81.25 |                     
  footerComponent.tsx      |      70 |       50 |      25 |      70 | 11,44-48            
  navbarComponent.tsx      |     100 |       50 |     100 |     100 | 42                  
 modules/app_configuration |     100 |      100 |     100 |     100 |                            
  app_settings.ts          |     100 |      100 |     100 |     100 |                            
  app_texts.ts             |     100 |      100 |     100 |     100 |                            
  list_lessons.ts          |     100 |      100 |     100 |     100 |                            
 modules/dashboard         |     100 |    78.57 |     100 |     100 |                            
  categoryProgress.ts      |     100 |    78.57 |     100 |     100 | 11,86,90                   
 modules/legal             |   87.83 |    70.45 |   72.22 |   90.27 |                            
  codeToTextParser.tsx     |     100 |      100 |     100 |     100 |                            
  cookieConsentBanner.tsx  |   79.54 |    65.78 |   54.54 |   83.33 | 23,45,50,56,198-217        
  datenschutz.tsx          |     100 |      100 |     100 |     100 |                            
  impressum.tsx            |     100 |      100 |     100 |     100 |                            
 modules/lessons           |    93.1 |    69.56 |     100 |   92.59 |                            
  lessonDetailQuiz.tsx     |   85.71 |    53.84 |     100 |   85.71 | 26                         
  lessonOverview.tsx       |     100 |      100 |     100 |     100 |                     
  sucessAnimation.tsx      |   93.75 |    83.33 |     100 |   92.85 | 39                         
 modules/login             |   88.88 |     90.9 |   76.92 |   90.38 |                            
  passwordDialog.tsx       |   88.88 |     90.9 |   76.92 |   90.38 | 45,68,86-87,98             

## Architecture
There are four different configuration files in the app_configuration folder. These allow you to configure the learning platform as you wish. 
These are mainly edited by the Learning Platform Creator. 

- `accountList`: Contains a list of the available accounts of the learning platform. (The ID is automatically generated for the user)
- `app_settings`: Contains settings such as which links must be replaced in the code preview function
- `app_texts`: Contains texts such as the title of the learning platform, the description, imprint text, data protection text etc.
- `list_lessons`: Contains the individual learning units with their quizzes, code exercises etc.

![Plattform Creator Architecture](/PlattformCreatorArchitecture_dark.png)
This architecture diagram shows how the Creator works. Bearer tokens are used for authentication and there are numerous other security mechanisms such as escaping, restricted IP access, prepared SQL statements, maximum login attempts and so on. However, the source code of the Learning Platform Creator is not open source and this diagram is only a rough and incomplete architecture.



## Available Scripts

In the project directory, you can run:

### `npm test`

Runs all tests.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!