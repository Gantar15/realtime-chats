import React from 'react';
import Longpulling from "./Longpulling";
import ServerSentEvents from './ServerSentEvents';
import Websocket from './Websocket';

import './app.css'


function App() {
  return (
      <div>
        <Websocket/>
      </div>
  )
}


export default App;