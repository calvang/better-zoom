import React from 'react';
import ReactDOM from 'react-dom';
import WebRTC from './components/WebRTC';
import './css/App.css';
import './css/index.css';
import * as serviceWorker from './serviceWorker';

const Main = () =>
  <>
    {/* <h1 className="page-header w3-jumbo">Better Zoom</h1> */}
    <WebRTC />
  </>;

ReactDOM.render(
    <Main />,
  document.getElementById('root')
);

serviceWorker.unregister();