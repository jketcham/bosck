### About
This is a proof of concept project made for a biomedical engineering capstone group. The objective was to build a wearable device that fits in a sock that monitors heart reate, basic location awareness and alerts on fall detection. The target audience for this device would be alzheimer's patients, and more broadly, geriatrics.

#### Web app
The web app receives and displays updates from the server via WebSockets. It graphs heart rate and alerts when any monitor (fall, heart rate, location) enters a 'warning' state.
Libraries used: React.js, D3.js (via recharts). Bootstrapped with create-react-app.

#### Server
The server establishes a connection over a serial port to the arduino and listens for data.
It sends the data it receives over a WebSocket to the web app.
Libraries used: serialport, ws

### How to start
- Server
  - Install project dependencies
    - `npm install`
  - Start server
    - `node server.js`
    - Verify server is listening on correct serial port.
- Web app
  - Navigate to `web` folder
  - Install project dependencies
      - `npm install`
  - Start dev server
    - `npm run start`
  - Open browser to `localhost:3000`
