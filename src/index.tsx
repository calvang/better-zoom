import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Routes';
import './css/App.css';
import './css/index.css';
import * as serviceWorker from './serviceWorker';

const Main = () =>
  <Routes />

ReactDOM.render(
    <Main />,
  document.getElementById('root')
);

serviceWorker.unregister();