import React from 'react';
import ReactDOM from 'react-dom';
import VideoGrid from './components/VideoGrid';
import './css/App.css';
import './css/index.css';
import * as serviceWorker from './serviceWorker';

const Main = () =>
  <div className="w3-container w3-black">
    <VideoGrid />
  </div>;

ReactDOM.render(
    <Main />,
  document.getElementById('root')
);

serviceWorker.unregister();